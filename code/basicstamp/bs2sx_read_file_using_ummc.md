---
layout: single
title: BS2SX Read File Using uMMC
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

Here is a complete example of a BS2SX reading data off of an SD card using a Rogue Robotics uMMC.

The program synchronizes with the uMMC, opens "/README.TXT", and prints the contents to the debug screen.

`uMMCReadExample.bsx`

```qbasic
' {$STAMP BS2sx}
' {$PBASIC 2.5}
' {$PORT COM1}
'
' Example program to read a file on a Rogue Robotics uMMC Serial Data Module
' Written by Brett Hagman (Rogue Robotics)
' http://www.roguerobotics.com/
'

UMMCR           PIN     7               ' uMMC Receive Pin (going to uMMC)
UMMCT           PIN     8               ' uMMC Transmit Pin (coming from uMMC)

#SELECT $STAMP
  #CASE BS2, BS2E, BS2PE
    T1200       CON     813
    T2400       CON     396
    T9600       CON     84
    T19K2       CON     32
    T38K4       CON     6
  #CASE BS2SX, BS2P
    T1200       CON     2063
    T2400       CON     1021
    T9600       CON     240
    T19K2       CON     110
    T38K4       CON     45
  #CASE BS2PX
    T1200       CON     3313
    T2400       CON     1646
    T9600       CON     396
    T19K2       CON     188
    T38K4       CON     84
#ENDSELECT

uMMCStartUpTimeOut  CON 2000
uMMCResponseTimeOut  CON 250

Inverted        CON     $4000
Open            CON     $8000
uMMCBaud        CON     T9600

buffer          VAR     Byte(11)

loopvar         VAR     Byte
subresponse     VAR     Byte
subvar          VAR     Byte


Main:
  DEBUG "uMMC File Read Test: Start", CR
  GOSUB uMMC_SYNC
  GOSUB uMMC_CloseFile
  GOSUB uMMC_OpenFile
  DEBUG "Reading data", CR, "----", CR
  DO
    SEROUT UMMCR, uMMCBaud, ["R 1 10", CR]
    GOSUB uMMC_GetResponse
    IF subresponse <> 0 THEN GOTO exit_loop
    GOSUB Shift_STR
    DEBUG STR buffer
  LOOP
exit_loop:
  IF subresponse <> 7 THEN
    DEBUG CR, "Error: ", HEX subresponse, CR
  ENDIF
  DEBUG "----", CR
  DEBUG "Done.", CR
  END

Shift_STR:
  FOR loopvar = 0 TO 10
    buffer(loopvar) = buffer(loopvar+1)
  NEXT
  buffer(10) = 0
  RETURN

Conv_HtoD:
  IF subvar >= "0" AND subvar =< "9" THEN
    subvar = subvar - "0"
  ELSE
    subvar = subvar - "A" + 10
  ENDIF
  RETURN

uMMC_CloseFile:
  SEROUT UMMCR, uMMCBaud, ["C 1", CR]
  GOSUB uMMC_GetResponse
  IF subresponse = 0 THEN
    DEBUG "File closed", CR
  ELSE
    DEBUG "Error: ", HEX subresponse, CR
    END
  ENDIF
  RETURN

uMMC_OpenFile:
  SEROUT UMMCR, uMMCBaud, ["O 1 R /README.TXT", CR]
  GOSUB uMMC_GetResponse
  IF subresponse = 0 THEN
    DEBUG "File opened", CR
  ELSE
    DEBUG "Error: ", HEX subresponse, CR
    END
  ENDIF
  RETURN


uMMC_GetResponse:
  buffer(0) = " "
  SERIN UMMCT, uMMCBaud, uMMCResponseTimeOut, uMMC_GetResponse_Escape, [STR buffer\11\">"]
uMMC_GetResponse_Escape:
  IF buffer(0) = " " OR buffer(0) = 0 THEN
    subresponse = 0
  ELSEIF buffer(0) = "E" THEN
    subvar = buffer(1)
    GOSUB Conv_HtoD
    subresponse = subvar * 16
    subvar = buffer(2)
    GOSUB Conv_HtoD
    subresponse = subresponse + subvar
  ELSE
    DEBUG "OTHER FAIL: ", HEX2 buffer(0), " ", HEX2 buffer(1), " ", HEX2 buffer(2), CR
    subresponse = 1
  ENDIF
  RETURN

uMMC_SYNC:
  loopvar = 0
uMMC_SYNC_AGAIN:
  SEROUT UMMCR, uMMCBaud, [27]  ' Send an ESC to clear the buffer
  SERIN UMMCT, uMMCBaud, uMMCStartUpTimeOut, uMMC_SYNC_Error, [STR buffer\1]
  IF buffer(0) = ">" THEN GOTO uMMC_SYNC_Complete
uMMC_SYNC_Error:
  loopvar = loopvar + 1
  IF loopvar = 1 THEN
    DEBUG "uMMC Sync Error: Bad/No response - trying S R (minimum 5)", CR
    SEROUT UMMCR, uMMCBaud, ["S R 5", CR]
    GOTO uMMC_SYNC_AGAIN
  ENDIF
  IF loopvar > 3 THEN GOTO uMMC_SYNC_Error_2
  GOTO uMMC_SYNC_AGAIN
uMMC_SYNC_Error_2:
  DEBUG "uMMC Sync Error: Too many retries - check S R, or S D (Baud)", CR
  GOTO uMMC_SYNC_End
uMMC_SYNC_Complete:
  DEBUG "uMMC Synchronized", CR
uMMC_SYNC_End:
  RETURN
```

