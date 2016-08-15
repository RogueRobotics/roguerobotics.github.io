---
layout: single
title: Time Lapse Video Project
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

I'm sure there are plenty of cameras out there that can do time lapse video out there, but the few that I tried always were hobbled in some sort of fashion.

Just for fun, I got one of those fancy COMedia C328R UART cameras to mess around with.

[Sean Voisen](http://voisen.org/) made an Arduino [C328R library](http://web.archive.org/web/20100511063505/http://gizmologi.st/code/c328r-camera-library/) which takes away a good deal of the pain of interfacing with the C328R camera (and believe me, there's a LOT of pain).  I had to modify the library a bit to accommodate using the SerialBase class (so I can use either NewSoftSerial or HardwareSerial).

Storing data was easy - on a [uMMC](http://www.roguerobotics.com/products/ummc).

I used an [rDuino LEDHead]({{ base_path }}/documentation/rduino) to control the whole smash.  This will work on an Arduino Duemilanove or an Arduino Mega just as well, but you won't get time stamps on the files, unless you add an RTC.  I used the rDuino LEDHead also because of the blinky lights for a nice progress bar.

I wanted to take pictures at a minimum rate of 1 every 30 seconds (or 2880 frames/day).  Piece of cake.

## Connections

Because the camera runs at 3.3V, you have to take care to change the signal levels from the Arduino to the camera, or else you may damage it.

Here is a schematic of the connections for the camera.

![Camera Connection]({{ base_path }}/code/images/c328-camera-connections.png)


## Libraries

Here are the libraries I used:

  * mem's [Time library](http://www.arduino.cc/playground/Code/Time)

  * Sean Voisen's [C328R library](http://gizmologi.st/code/c328r-camera-library/)
    * I modified this library to use the [Arduino Serial Base Class]({{ base_path }}/code/arduino_serial_base_class.html).
    * The SerialBase updated version is available [here](http://code.google.com/p/rogue-code/downloads/list?q=label:Tag-ArduinoMods).
  * Mikal Hart's [NewSoftSerial library](http://arduiniana.org/libraries/newsoftserial/)
    * Again, this needed to be modified to use the [Arduino Serial Base Class]({{ base_path }}/code/arduino_serial_base_class.html).
    * The SerialBase updated version is available [here](http://code.google.com/p/rogue-code/downloads/list?q=label:Tag-ArduinoMods).
  * My [RogueSD library]({{ base_path }}/code/library/arduino/roguesd.html)

## Demonstration

Files are stored as jpeg images (named with a time stamp).  After the sequence is done, you can assemble the jpeg images using your favorite video editor (that allows you to import a sequence of images).

Here is a sample time lapse video out the window.  Nothing to write home about, but a good demonstration.  The images from the camera are pretty low quality (you can see color quantization artifacts in the clouds).

<iframe width="640" height="480" src="https://www.youtube.com/embed/PWnTDC1zOsw" frameborder="0" allowfullscreen></iframe>

## Source Code

Finally, here's the source code.

`jpeg_cam_timelapse.pde`

```cpp
#include <rDuinoLEDs.h>
#include <Time.h>
#include <TimeAlarms.h>
#include <Wire.h>  
#include <DS1307RTC.h>  // a basic DS1307 library that returns time as a time_t
#include <RogueSD.h>
#include <CameraC328R.h>
#include <NewSoftSerial.h>
#include <avr/pgmspace.h>

char *Failed = "Failed!";
char *Done = "Done";

int8_t filehandle = 0;
uint32_t position = 0;
uint32_t segsize = 0;
uint8_t segcount = 0;
uint8_t progbar = 0;

#define debugSerial Serial

//NewSoftSerial ummc_s(2, 3);
NewSoftSerial cam_s(4, 5);
//NewSoftSerial db_s(6, 7);
//NewSoftSerial debugSerial(4, 5);
CameraC328R camera(cam_s);
RogueSD ummc1(Serial1);


void errorFlash(uint8_t l)
{
  while (1)
  {
    LEDS.set(1 « l);
//digitalWrite(13, 1);
    delay(300);
    LEDS.set(0);
//digitalWrite(13, 0);
    delay(300);
  }
}


void setup()
{
  int rtc[6];

  // input pins
  pinMode(8, INPUT);
  digitalWrite(8, HIGH);

  Serial1.begin(57600);
//  ummc_s.begin(57600);
  cam_s.begin(57600);
  debugSerial.begin(9600);

  // uMMC
  debugSerial.print("Syncing uMMC: ");
  if (ummc1.sync() == 0)
  {
    debugSerial.println(Done);
    LEDS.set(0, HIGH);
    // TODO: create directory if it doesn't exist
    // (open "/snaps/test.txt", F5 = /snaps doesn't exist)
  }
  else
  {
    if (ummc1.LastErrorCode == ERROR_CARD_NOT_INSERTED)
      debugSerial.println("No card inserted!");
    else
    {
      debugSerial.print(Failed);
      debugSerial.print(" Error Code: ");
      debugSerial.println(ummc1.LastErrorCode, HEX);
    }

    errorFlash(0);
  }

  // RTC
  debugSerial.print("Syncing RTC: ");
  setSyncProvider(RTC.get);   // the function to get the time from the RTC
  if (timeStatus() == timeSet)
  {
     LEDS.set(1, HIGH);  // this may not get set if RTC can not be synced
     debugSerial.println(Done);
     // now set the time on the uMMC
     rtc[0] = year();
     rtc[1] = month();
     rtc[2] = day();
     rtc[3] = hour();
     rtc[4] = minute();
     rtc[5] = second();
     ummc1.settime(rtc);
     debugSerial.println("uMMC RTC has been set");
  }
  else
  {
     debugSerial.println(Failed);
  }

  // Camera
  debugSerial.println("Camera:");
  debugSerial.print("  Sync: ");
  if(camera.sync())
  {
    LEDS.set(2, HIGH);
    debugSerial.println(Done);
  }
  else
  {
    debugSerial.println(Failed);
    errorFlash(2);
  }

  delay(200);

  debugSerial.print("  Init: ");
  if(camera.initial( CameraC328R::CT_JPEG, CameraC328R::PR_80x60, CameraC328R::JR_640x480 ))
  {
    LEDS.set(3, HIGH);
    debugSerial.println(Done);
  }
  else
  {
    debugSerial.println(Failed);
    errorFlash(3);
  }

  delay(200);

  debugSerial.print("  Set pSize: ");
  if(camera.setPackageSize(64))
  {
    LEDS.set(4, HIGH);
    debugSerial.println(Done);
  }
  else
  {
    debugSerial.println(Failed);
    errorFlash(4);
  }

  delay(200);

  debugSerial.print("  Set lFreq: ");
  if(camera.setLightFrequency(CameraC328R::FT_60Hz))
  {
    LEDS.set(5, HIGH);
    debugSerial.println(Done);
  }
  else
  {
    debugSerial.println(Failed);
    errorFlash(5);
  }
  
  debugSerial.println("Initialization complete");
  for (int i = 6; i < 8; i++)
  {
    LEDS.set(i, HIGH);
    delay(300);
  }

  delay(500);
  LEDS.set(0);

  randomSeed(analogRead(0));

  // now start time lapse
  
  Alarm.timerRepeat(30, takePicture);

}


void takePicture()
{
  bool res = true;
  char filename[60];

//  if (ummc1.sync() != 0)
//    debugSerial.println("uMMC Sync Failure");

  if (!camera.sync())
    debugSerial.println("Bad sync");

  if(!(res = camera.snapshot( CameraC328R::ST_COMPRESSED, 0 )))
    debugSerial.println("Bad Snapshot?");

  LEDS.set(0);

  if (res == true)
  {
    debugSerial.println("Snapshot ready");
    debugSerial.print("Opening file: ");
    sprintf_P(filename, PSTR("/snaps/IMG%04u%02u%02u%02u%02u%02u.JPG"), year(), month(), day(), hour(), minute(), second());
//    sprintf_P(filename, PSTR("/snaps/IMG%04u.JPG"), random(10000));
    debugSerial.println(filename);

    filehandle = ummc1.open(filename, OPEN_WRITE);

    if (filehandle > 0)
    {
      position = 0;
      segsize = 0;
      // get the picture
      if(!(res = camera.getJPEGPicture( CameraC328R::PT_JPEG, 1000, &getJPEGPicture_callback)))
        debugSerial.println("BAD JPG GET?");
      else
        debugSerial.println("Picture saved");

      ummc1.close(filehandle);

      LEDS.set(0);
    }
    else
    {
      debugSerial.print("  Error Code: ");
      debugSerial.println(ummc1.LastErrorCode, HEX);
    }
  }  
}


void loop()
{
  // now wait for keypress
  // then take a snap

  delay(500);

  // wait until the key has been released first
  while (digitalRead(8) == LOW)
    Alarm.delay(100);

  // now wait for a press
  while (digitalRead(8) == HIGH)
    Alarm.delay(100);
  
  takePicture();
}


void getJPEGPicture_callback( uint16_t pictureSize, uint16_t packageSize, uint16_t packageCount, byte* package )
{
  if (segsize == 0)
  {
    segsize = pictureSize / 8;
    segcount = 1;
    progbar = 1;
  }
  
  if(filehandle > 0 && package != NULL && packageSize <= 64)
  {
    position += packageSize;
    if (position > segcount * segsize)
    {
      segcount++;
      progbar = (progbar « 1) + 1;
    }

    LEDS.set(progbar);
//    debugSerial.print(position, DEC);
//    debugSerial.print('/');
//    debugSerial.println(pictureSize, DEC);
    ummc1.write(filehandle, packageSize, (const char *)package);
  }
  else
  {
    debugSerial.println("package is NULL!");
  }
}
```
