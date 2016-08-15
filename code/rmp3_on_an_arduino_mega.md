---
layout: single
title: rMP3 On An Arduino Mega
---
{% include base_path %}

Until we have the SPI interface for commands working on the rMP3, you will have to use the serial interface to communicate with the rMP3.

In the case with the Arduino Mega, you can't use NewSoftSerial to communicate with the rMP3 on pins 6 and 7 (the default rMP3 serial pins).

A quick fix is to use jumpers from pins 6 and 7 to one of the hardware serial ports on the Arduino Mega.

(In the following picture, we've jumped pin 6 to pin 19 (RX1), and pin 7 to pin 18 (TX1)).

![rMP3 on Arduino Mega]({{ base_path }}/code/images/rmp3-on-arduinomega.jpg)

And here is an example to test on the Mega:

`rMP3Mega-Example.pde`

```cpp
#include <RogueMP3.h>

// change this file name and make sure this file exists in the root folder on the SD card
#define SONG "/mysong.mp3"

RogueMP3 rmp3(Serial1);

void setup()
{
  Serial.begin(9600);
  Serial1.begin(9600);
  
  rmp3.sync();
  rmp3.playfile(SONG);
}

void loop()
{
}
```
