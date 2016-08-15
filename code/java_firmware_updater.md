---
layout: single
title: Java Firmware Updater
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

**INFO:** This Processing sketch is no longer supported.
{: .notice--info}

This is a cross-platform updater for the uMMC/uMP3/rMP3.  You will need put the module into update mode, then use the following Processing sketch to send the firmware file to the module.

**Requirements:**

  * Download and install [Processing](http://www.processing.org/) for your platform (available for GNU/Linux, Mac OS X, and Windows).
  * Firmware for your module: [downloads]({{ base_path }}/code/downloads) (you will have to "unzip" it).

**Update Steps:**

  1. Launch **Processing**.
  1. Load the following sketch (you can click on the file title to download the file, or you can copy and paste it).
  1. Connect module via USB to TTL converter (such as the SparkFun(tm) FTDI Basic Breakout - 5V [DEV-09115]).
  1. Ensure the module is in [Update Mode]({{ base_path }}/faq).
  1. Make sure your serial port index matches where you've connected the module.
  1. Run the sketch, and select the firmware from where you downloaded and unzipped it.
  1. Progress should be shown in the Processing console (not in the blank square window).

I wrote this pretty quickly, taking some bits from other examples - so it's not exactly bug free and it certainly isn't pretty - but it does the job.  If you'd like to improve it, by all means, go ahead, and post the changes here (it's an open wiki).

If anyone has any suggestions and/or improvements, let me know.

`RogueUpdater.pde`

```java

/* Rogue Robotics firmware "updater" for Processing           */
/* http://www.roguerobotics.com/                              */
/* Written by Brett Hagman                                    */
/* Version: 0004                                              */
/* Make sure you pick your serial port index number!          */
/* VERSION  DATE        NOTES                                 */
/* 0.0001               Initial coding                        */
/* 0.0002   02/07/2010  Moved serial port before file load    */
/*                      to skip serial port init time         */
/* 0003     02/17/2010  Small changes                         */
/* 0004     02/18/2010  Even speedier! Sending byte[] instead */
/*                      of individual chars                   */

import processing.serial.*;

int portIndex = 1;
Serial myPort;

void setup() {
  size(256, 256);  // Stage size
  fill(255);
  noLoop();
}

byte a2b(byte msn, byte lsn)
{
  String s = "";
  s += char(msn);
  s += char(lsn);
  return byte(unhex(s));
}

void draw()
{
  // Print a list of the serial ports, for debugging purposes:
  println(Serial.list());

  String portName = Serial.list()[portIndex];
  myPort = new Serial(this, portName, 9600);

  String loadPath = selectInput();  // Opens file chooser

  if (loadPath == null) {
    // If a file was not selected
    println("No file was selected...");
  } else {
    // If a file was selected, print path to file
    println(loadPath);
  }

  byte inbytes[] = loadBytes(loadPath);

  // now convert to binary
  byte[] buffer = new byte[inbytes.length/2];

  int j = 0;
  for (int i = 0; i < inbytes.length; i+=2, j++)
  {
    buffer[j] = a2b(inbytes[i], inbytes[i+1]);
  }

  print("File size: ");
  println(buffer.length);

  int index = 0;
  int frameSize = 0;
  byte receivedByte;
  byte retries = 0;
  
  for(index = 0; index < buffer.length; index += frameSize)
  {
    frameSize = (buffer[index] & 0xff) « 8;
    frameSize += (buffer[index + 1] & 0xff) + 2;

    myPort.clear();

    println("Transferring: " + index + "/" + buffer.length + " (" + int(100*index/buffer.length) + "%)");
    
    byte[] bytesToSend = new byte[frameSize];

    for (int i = 0; i < frameSize; i++)
    {
      bytesToSend[i] = buffer[index + i];
    }

    myPort.write(bytesToSend);

    int timeout = 0;
    // now get response
    while (myPort.available() <= 0)
    {
      delay(20);
      if (timeout++ >= 150)
      {
        println("Timeout waiting for response.  Update failed.");
        exit();
      }
    }

    receivedByte = byte(myPort.read());

    switch (receivedByte)
    {
      case 0x11:
        retries = 0;
        break;
      case 0x22:
      default:
        retries++;
        if (retries > 4)
        {
          println("CRC error. File damaged.");
          myPort.stop();
          exit();
        }
        else
        {
          index -= frameSize;
          println("Retry");
        }
        break;
    }
  }
  println("Done!");
  exit();
}
```

