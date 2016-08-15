---
layout: single
title: rEDI Details
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

The rEDI Educational Board can be powered via the USB connection or with an external power supply.  You can not use power from both at the same time.  Jumper JP1 selects the power from either the USB connection, or the power jack/battery.  Jumper JP3 selects the voltage regulator source as either from the jack or the battery terminals.

External (non-USB) power can come either from an AC-to-DC adapter (wall-wart) or battery. The adapter can be connected by plugging a 2.1mm center-positive plug into the board's power jack. Leads from a battery can be inserted in the battery screw-down terminals.

The board can operate on an external supply of 7 to 12 volts. If supplied with less than 7V, however, the 5V pin may supply less than five volts and the board may be unstable. If using more than 12V, the voltage regulator may overheat and damage the board. The recommended range is 7 to 12 volts.

The power pins are labeled as follows:

  * VIN. The input voltage to the board when it's using an external power source (as opposed to 5 volts from the USB connection or other regulated power source). You can supply voltage through this pin, or, if supplying voltage via the power jack, access it through this pin.
  * VCC/5V. The regulated power supply used to power the microcontroller and other components on the board. This can come either from VIN via an on-board regulator, or be supplied by USB or another regulated 5V supply.
  * 3V3. This power pin is supplied by the 3V3 voltage regulator within the FTDI FT232RL USB to serial converter.  It can supply a maximum of 50 mA.
  * GND. Ground pins. 


## Memory

The ATmega644P has 64 KiB of flash memory for storing code (of which 2 KiB is used for the bootloader).  The ATmega644P has 4 KiB of SRAM and 2 KiB of EEPROM (which can be read and written with the EEPROM library).


## Input and Output

Each of the 32 digital pins on the rEDI can be used as an input or output, using pinMode(), digitalWrite(), and digitalRead() functions. They operate at 5 volts. Each pin can provide or receive a maximum of 40 mA and has an internal pull-up resistor (disconnected by default) of 20-50 kOhms. Some pins have specialized functions:

  * Serial: 0 (RX) and 1 (TX). Used to receive (RX) and transmit (TX) TTL serial data. These pins are connected to the corresponding pins of the USB connection, used to communicate externally or upload sketch code.
  * Serial1: 2 (RX) and 3 (TX). Used to receive (RX) and transmit (TX) TTL serial data.  This hardware serial port is free for use.
  * External Interrupts: 2, 3, and 8. These pins can be configured to trigger an interrupt on a low value, a rising or falling edge, or a change in value. See the attachInterrupt() function for details.  The external interrupts (pins 2 and 3) can not be used at the same time as Serial1.
  * PWM: 4, 5, 6, 7, 9, 10. Provide 8-bit PWM output with the analogWrite() function.
    * The servo headers are connected to pins 4, 5, 6, and 7 (Servo 1, 2, 3, 4, respectively).
    * (optional) If an LCHB is connected, pins 9 and 10 are used for 1EN and 2EN respectively.
  * SPI: 10 (SS), 11 (MOSI), 12 (MISO), 13 (SCK). These pins support SPI communication.
  * I2C: 24 (SCL) and 25 (SDA). Support I2C (TWI) communication using the Wire library. 
  * AREF. Reference voltage for the analog inputs. Used with analogReference().
  * Reset. Bring this line LOW to reset the microcontroller. Typically used to add a reset button to shields which block the one on the board.
  * Switch/LED combos: 28, 29, 30, and 31. These can be either used as switches, or as LEDs. To utilize both the LED and the switch at the same time, you can use the LitSwitch library.

The rEDI Educational Board has 8 analog inputs, each of which provide 10 bits of resolution (i.e. 1024 different values). By default they measure from ground to 5 volts, though is it possible to change the upper end of their range using the AREF pin and the analogReference() function.  Some pins have specialized functions:

  * Thumb wheel trim-pot: A6. You can use this for easy 10 bit digital wheel input.
  * Jack/Battery voltage monitor: A7. This analog input monitors the input voltage just before the voltage regulator. You can use it to monitor the battery voltage for display or other control.


## Communication

The rEDI Educational Board has a number of facilities for communicating with a computer, another Arduino, or other microcontrollers. The ATmega644P provides dual UART TTL (5V) serial communication, which is available on digital pins 0 (RX0), 1 (TX0), 2 (RX1), and 3 (TX1).

The SoftwareSerial and NewSoftSerial libraries allows for serial communication on any of the rEDI's digital pins.

The ATmega644P also supports I2C (TWI) and SPI communication. The Arduino software includes a Wire library to simplify use of the I2C bus; see the documentation for details. To use the SPI communication, please see the ATmega644P datasheet.


## Programming

The rEDI Educational Board can be programmed with the Arduino software ([download](http://arduino.cc/en/Main/Software)). See the [downloads and installation](downloads.html) information for configuring the Arduino software to work with the rEDI Educational Board.

The ATmega644P on the rEDI Educational Board comes preburned with a bootloader that allows you to upload new code to it without the use of an external hardware programmer. It communicates using the original STK500 protocol.

You can also bypass the bootloader and program the microcontroller through the ICSP (In-Circuit Serial Programming) header; see [these instructions](http://arduino.cc/en/Hacking/Programmer) for details.


## Automatic (Software) Reset

Rather then requiring a physical press of the reset button before an upload, the rEDI Educational Board is designed in a way that allows it to be reset by software running on a connected computer.  When this line is asserted (taken low), the reset line drops long enough to reset the chip. The Arduino software uses this capability to allow you to upload code by simply pressing the upload button in the Arduino environment. This means that the bootloader can have a shorter timeout, as the lowering of DTR can be well-coordinated with the start of the upload.

This setup has other implications. When the rEDI Educational Board is connected to either a computer running Mac OS X or Linux, it resets each time a connection is made to it from software (via USB). For the following half-second or so, the bootloader is running on the rEDI. While it is programmed to ignore malformed data (i.e. anything besides an upload of new code), it will intercept the first few bytes of data sent to the board after a connection is opened. If a sketch running on the board receives one-time configuration or other data when it first starts, make sure that the software with which it communicates waits a second after opening the connection and before sending this data.

The rEDI Educational Board contains a trace that can be cut to disable the auto-reset (remove R6).  The pads on either side of the trace can be soldered together to re-enable it.


## Physical Characteristics

The maximum length and width of the rEDI Educational Board PCB are 4 and 3 inches respectively, with the USB connector and power jack extending beyond the former dimension. Four screw holes allow the board to be attached to a surface or case. Note that the distance between digital pins 7 and 8 is 160 mil (0.16"), not an even multiple of the 100 mil spacing of the other pins.
