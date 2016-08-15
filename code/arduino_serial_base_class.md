---
layout: single
title: Arduino Serial Base Class
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

This page explains how to add a Serial Base Class to the Arduino Serial classes.

## What is a Base Class?

A Base Class lays down some guidelines for how you build a bunch of related classes.  In our case we're using serial classes.  The base class will give us a set of methods that are available in all of the classes that are based upon it.

## Why a Serial Base Class?

The short answer:  to make things easier.

The long answer:  there are a lot of confusing bits when it comes to interfacing with a serial device.  Using a Serial Base Class for the serial devices on the Arduino will allow for better hardware abstraction.  This way, we don't need to know exactly how a device is connected to our hardware - but we will be able to talk to it in the same way if it were connected to a hardware serial pin or a software serial pin.

## How do I add a Serial Base Class?

OK.  You've read the stuff above, and you're thinking, "what a bunch of mumbo-jumbo. I don't care.  How do I add this silly thing?".  Well you're in luck.  Here are the steps:

### Arduino IDE 1.0+

With the 1.0+ releases there is a built in software serial interface that will allow your project to work with the rMP3 shield.  Here is some example code:

```cpp
//Use the SoftwareSerial in place of NewSoftSerial.h
#include <SoftwareSerial.h>
#include <RogueMP3.h>

//Use SoftwareSerial in place of NewSoftSerial
SoftwareSerial rmp3_serial(6, 7);
RogueMP3 rmp3(rmp3_serial);
 
void setup()
{
  Serial.begin(9600);
  rmp3_serial.begin(9600);
 
  rmp3.sync();
 
  rmp3.playfile("/Daft Punk - Technologic.mp3");
}
 
void loop()
{
}
```

The NewSoftSerial files do not need to be installed with the Arduino 1.0+ versions.
### Arduino IDE V0021+

After collaboration with the people of the Arduino development mailing list, the name of the base class was changed from SerialBase to Stream.  Unfortunately, there is still a problem with the Arduino core, so you still need download a modified version.

  1. Download the [Arduino with Stream Core](http://rogue-code.googlecode.com/files/ArduinoCore-Stream.zip).
  1. Install into `SKETCHBOOK/hardware` folder (create the `hardware` folder if it doesn't exist).
  1. Start the IDE and select one of the "(Stream)" version of your board from the Tools &middot; Board menu.
  1. NewSoftSerial and other libraries with Stream modifications can be downloaded from [here](http://code.google.com/p/rogue-code/downloads/list?can=2&q=arduinomods).

### Arduino IDE V0019-0020

These Arduino Versions are messed up.  Don't download them.

### Arduino IDE V0018

  1. Download the [Arduino with SerialBase Core](http://rogue-code.googlecode.com/files/ArduinoCore-SerialBase.zip).
  1. Install into `SKETCHBOOK/hardware` folder (create the `hardware` folder if it doesn't exist).
  1. Start the IDE and select one of the "(SerialBase)" version of your board from the Tools &middot; Board menu.
  1. NewSoftSerial and other libraries with SerialBase modifications can be downloaded from [here](http://code.google.com/p/rogue-code/downloads/list?can=2&q=arduinomods).

### Arduino IDE Versions prior to V0018

  1. Add `SerialBase.h` to your `arduino/hardware/cores/arduino` folder.
  1. Make some small changes to `HardwareSerial.cpp` and `HardwareSerial.h` in `arduino/hardware/cores/arduino`.
  1. If you're using NewSoftSerial, you'll need to make some similar changes.

To make it easier, I've already made the changes and they can be downloaded from:

[Google Code - Rogue Robotics Libraries for Arduino](http://code.google.com/p/rogue-code/downloads/list)

`SerialBase.h`, `HardwareSerial.h`, `HardwareSerial.cpp` → `arduino/hardware/cores/arduino`.

The modified NewSoftSerial library can replace your existing NewSoftSerial library in `arduino/hardware/libraries`.

After that, you're ready to go!

