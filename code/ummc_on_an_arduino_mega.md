---
layout: single
title: uMMC On An Arduino Mega
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

Here is an example of how to connect a uMMC to an Arduino Mega.

## Connections

First, connect the uMMC to the Arduino Mega.

|  uMMC          |  Arduino Mega  |
|----------------|----------------|
|+ (V)           |5V (Power connector)  |
|G (either one)  |GND (Power connector)  |
|T (Transmit)    |Pin 19 (RX1)  |
|R (Receive)     |Pin 18 (TX1)  |

![uMMC connected to Arduino Mega  ]({{ base_path }}/code/images/arduino_mega_and_ummc.jpg)

## Install The RogueSD Library

Next, install the [RogueSD library]({{ base_path }}/code/library/arduino/roguesd.html).

## Example Sketch

And now a simple sketch to test it out.  Pins 18 and 19 correspond to `Serial1` on the Arduino Mega.

`ummc_mega_example.pde`

```cpp
#include <RogueSD.h>

RogueSD ummc(Serial1);

void setup()
{
  int8_t filehandle;

  Serial.begin(9600);

  Serial1.begin(9600);
  
  // this just makes sure we have a nice random number later
  randomSeed(analogRead(0));

  // prepare the communications with the uMMC and closes all open files (if any)
  ummc.sync();

  // open a file (append data)
  filehandle = ummc.open("/filetest.txt", OPEN_APPEND);

  if(filehandle > 0)
  {
    Serial.println("File opened.");

    // append some data
    ummc.writeln_prep(filehandle);

    // you can use any of the standard print methods to send data to the file.
    ummc.print("You'll see this many times in this file. RAND: ");
    ummc.print(random(10000));
    ummc.writeln_finish();

    Serial.println("Append complete.");

    ummc.close(filehandle);

    Serial.println("File closed.");
  }
  else
  {
    Serial.print("ERROR: ");
    Serial.println(ummc.LastErrorCode, HEX);
  }
}

void loop()
{
}
```

