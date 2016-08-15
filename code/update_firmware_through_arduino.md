---
layout: single
title: Update Firmware Through Arduino
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

This example shows how to update the firmware on the uMMC or uMP3 using an Arduino.

**This is outdated. Please see [Firmware Update Tool]({{ base_path }}/tools/rogueupdater.html)**


**NOTE:** This is only an updater for Windows. The Windows updater only supports "COM1" → "COM4", so you will have to make sure your Arduino Serial connection is using one of those.  See [here](http://www.arduino.cc/cgi-bin/yabb2/YaBB.pl?num=1152222752/0) for more info.

Before you start the procedure below, it is best to compile and download the "Serial Pass-though" sketch to your Arduino.  Make sure you select the right one for your Arduino board.  After uploading the sketch to your Arduino, quit the Arduino IDE.

  * [Arduino Duemilanove - Serial Pass-through sketch](#arduino_duemilanove_-_serial_pass-through_sketch.html)
  * [Arduino Mega - Serial Pass-through sketch](#arduino_mega_-_serial_pass-through_sketch.html)

Next, make sure you have the appropriate firmware downloaded for your module.

[Firmware Downloads]({{ base_path }}/code/downloads)

"Unzip" the files from the firmware download into a directory you know, such as: `C:\rogueupdate`.

Now the procedure.

1. Make sure your Arduino board is not plugged in.
1. Connect the uMMC or uMP3 to your Arduino:
  * Arduino Duemilanove: Pin 4 to uMMC/uMP3 "T", Pin 5 to uMMC/uMP3 "R".
  * Arduino Mega: Pin 18 (TX1) to uMMC/uMP3 "R", Pin 19 (RX1) to uMMC/uMP3 "T".
  * Power and ground pins.
1. Make sure there is no SD card in the uMMC/uMP3.
1. The tricky part: jump the "UPD" pads on the uMMC/uMP3.  We suggest using a screwdriver, but it's not that easy to do, since the pads are flat, and it's difficult to make a connection.  Soldering the pads together will DEFINITELY work, but you will have to desolder the connection after the update.  You can try some other methods to make sure you have a solid connection between the pads.  If you come up with a great idea, try updating this wiki and letting the rest of us know.
1. With the "UPD" pads jumped, power up the Arduino board.  The Activity LED on the uMMC/uMP3 will turn on and stay on.
1. If the Activity LED doesn't stay on, you will have to repeat the procedure starting at step 1.
1. Once the Activity LED is on, the uMMC/uMP3 is in update mode, and we can send it new firmware.
1. Click Start→Run... and type this: `c:\rogueupdate\update.exe XXXXXXXX.rfw -COM3` and press Enter.
  * change `c:\rogueupdate\` to wherever you put the firmware update files.
  * `XXXXXXXX.rfw` is the name of the firmware update file, for example: "ummc-102-08-b004.rfw"
  * Also, change `-COM3` to whatever you set your Arduino board to in the previous step.
1. The updater will start updating the firmware on the uMMC/uMP3, and the Activity LED will blink.  The progress will be shown in the command window.  Once it is complete, the window will close, and the uMMC/uMP3 will restart.
1. Firmware update complete.

## Arduino Duemilanove - Serial Pass-through Sketch

`Rogue_Duemilanove_Pass-through.pde`

```cpp
/**************************************************
* Simple pass-through serial application for
* Arduino and Arduino-clones.
* You can use this for testing and
* updating the Rogue Robotics
* uMMC Serial Data Module or
* uMP3 Playback Module.
*
* You will need the "NewSoftSerial" library
* available at the Arduino website.
* http://arduino.cc/
* http://arduino.cc/en/Reference/Libraries
***************************************************/

#include <NewSoftSerial.h>

// You can set this to whatever pins you have the uMMC or uMP3 connected.
// e.g. 4 is connected to uMMC "T", 5 is connected to uMMC "R"
NewSoftSerial out(4, 5);

// If you are using this to update the firmware on the uMMC or uMP3,
// you will have to make sure that both the Serial connection and the
// out connection are set to 9600 bps.
void setup()
{
  out.begin(9600);
  Serial.begin(9600);
  pinMode(13, OUTPUT);
  digitalWrite(13, 0);
}

void loop()
{
  digitalWrite(13, 0);
  if(out.available())
  {
    digitalWrite(13, 1);
    Serial.print((uint8_t)out.read());
  }
  if(Serial.available())
  {
    digitalWrite(13, 1);
    out.print((uint8_t)Serial.read());
  }
}
```

## Arduino Mega - Serial Pass-through Sketch

`Rogue_Mega_Pass-through.pde`

```cpp
/**************************************************
* Simple pass-through serial application for the
* Arduino Mega.
* You can use this for testing and
* updating the Rogue Robotics
* uMMC Serial Data Module or
* uMP3 Playback Module.
***************************************************/

// Arduino Mega: Pin 18 (TX1) to uMMC/uMP3 “R”, Pin 19 (RX1) to uMMC/uMP3 “T”

// If you are using this to update the firmware on the uMMC or uMP3,
// you will have to make sure that both the Serial connection and the
// out connection are set to 9600 bps.
void setup()
{
  Serial1.begin(9600);
  Serial.begin(9600);
  pinMode(13, OUTPUT);
  digitalWrite(13, 0);
}

void loop()
{
  digitalWrite(13, 0);
  if(Serial1.available())
  {
    digitalWrite(13, 1);
    Serial.print((uint8_t)Serial1.read());
  }
  if(Serial.available())
  {
    digitalWrite(13, 1);
    Serial1.print((uint8_t)Serial.read());
  }
}
```

