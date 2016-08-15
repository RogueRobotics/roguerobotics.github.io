---
layout: single
title: Spectrum Analyzer Demonstration
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

The rMP3 has (as of firmware version 100.02-b002) a command to retrieve values from a built-in spectrum analyzer.  You can select the number of, and the frequency of the bands you want to monitor).

You can read more about the firmware update here: [rMP3 Beta Firmware]({{ base_path }}/documentation/rmp3/beta/)

## Components

  * Arduino Duemilanove (2009)
  * [rMP3 Playback Shield/Module](http://www.roguerobotics.com/products/rmp3)
  * Serial LCD (Sparkfun SerLCD is what I used - connected to a 20x4 LCD)

## Libraries

You'll need the following Arduino libraries:

  * [RogueSD]({{ base_path }}/code/library/arduino/roguesd.html)
  * [RogueMP3]({{ base_path }}/code/library/arduino/roguemp3.html)
  * [NewSoftSerial](http://code.google.com/p/rogue-code/downloads/list?q=ArduinoMods) (modified for Stream/SerialBase)

## Video
<iframe width="853" height="480" src="https://www.youtube.com/embed/op-FcjMh3IA" frameborder="0" allowfullscreen></iframe>

## Coding Details

### Spectrum Analyzer Data

Setting and retrieving the values from the rMP3 is the easy part.

First, you need to set the bands you want to work with.  I did this in the `playTrack()` function:

```cpp
void playTrack(void)
{
  char mp3path[128];

// ...

  rmp3.playfile(mp3path);

  rmp3.setspectrumanalyzer(bandfreqs, 10);

  Serial.println("Playing");
}
```

Then, to retrieve the values (while the rMP3 is playing the file):

```cpp
void doLCDSpec(void)
{
  // prepare for up to 23 bands
  uint8_t v[23];

  rmp3.getspectrumanalyzer(v);
```

### Displaying on the LCD

The tough part is getting it displayed on the LCD.

Luckily I wrote some functions to make vertical bars get displayed on the SerLCD controlled LCD.

First you need to prepare all of the "custom characters" on the LCD - we need to have the 8 different levels because each character on the LCD has 8 rows.

```cpp
void lcdCustomChars(void)
{
  // sets up the custom chars
  byte chars[] = {
    0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b11111,
    0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b11111, 0b11111,
    0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b11111, 0b11111, 0b11111,
    0b00000, 0b00000, 0b00000, 0b00000, 0b11111, 0b11111, 0b11111, 0b11111,
    0b00000, 0b00000, 0b00000, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111,
    0b00000, 0b00000, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111,
    0b00000, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111,
    0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111
  };

  for (int i = 0; i < 8; i++)
    lcdSetCustomChar(i, chars + i*8);

  delay(100);
}
```

Now for the weird and strange looking math.  We need to translate a value into a vertical bar to be displayed on the LCD.  It's a bit tricky, but not all that difficult.

The function below maps the value to match the number of bars (i.e. how tall? if you have a 2 line LCD, you can either use 1 or 2 bars).  Then it draws the bar as tall as it needs based on the `value`.  FYI: `x` refers to which column you are drawing.

```cpp
void lcdSpecMap(int x, int value, int numBars)
{
  int8_t i, val;

  // map value of 0 - maxSpecValue → 0→7, 0→15, 0→23, 0→31
  if (value > maxSpecValue)
    value = maxSpecValue;

  value = map(value, 0, maxSpecValue, 0, 8*numBars);

  for (i = 0; i < numBars; i++)
  {
    lcdGotoXY(x, i);
    val = value - (8 * (numBars - 1 - i));

    if (val <= 0)
      val = ' ';
    else if (val > 8)
      val = 7;
    else
      val -= 1;
    LCD.print(val, BYTE);
  }
}
```

### Full Source

`rMP3_Spectrum_Analyzer_Demo`

```cpp
#include <RogueMP3.h>
#include <RogueSD.h>
#include <NewSoftSerial.h>

NewSoftSerial LCD(255, 4);
NewSoftSerial rmp3_s(6, 7);

RogueMP3 rmp3(rmp3_s);
RogueSD filecommands(rmp3_s);

uint16_t bandfreqs[] = { 50, 120, 200, 500, 1000, 2000, 5000, 8000, 10000, 20000 };

uint16_t numfiles = 0;

#define MP3PATH "/mp3/"
// you need to put the two double quotes ("") in the middle below,
// because the Arduino IDE looks for unclosed comments.
#define MP3FILTER "/mp3/""*.mp3"


#define lcdHeight 4
#define lcdWidth 20
#define maxSpecValue 20

void lcdClear()
{
   LCD.print(0xFE, BYTE);      //command flag
   LCD.print(0x01, BYTE);      //clear command.
}

void lcdBacklightOn(uint8_t level)
{  //turns on the backlight
    LCD.print(0x7C, BYTE);     //command flag for backlight stuff
    LCD.print(level, BYTE);    //light level.
}

void lcdBacklightOff()
{  //turns off the backlight
    LCD.print(0x7C, BYTE);     //command flag for backlight stuff
    LCD.print(0x80, BYTE);     //light level for off.
}

void lcdGotoXY(int x, int y)
{
  int pos;

  if (x >= lcdWidth)
    x = lcdWidth-1;
  if (y >= lcdHeight)
    y = lcdHeight-1;

  pos = x + ((y % 2) * 0x40);

  if (y >= 2)
    pos += lcdWidth;

  LCD.print(0xFE, BYTE);
  LCD.print(0x80 + pos, BYTE);
}


void lcdSetCustomChar(byte pos, byte values[])
{
  LCD.print(0xFE, BYTE);
  LCD.print(0x40 + pos * 8, BYTE);
  for (int i = 0; i < 8; i++)
    LCD.print(values[i], BYTE);
}


void lcdCustomChars(void)
{
  // sets up the custom chars
  byte chars[] = {
    0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b11111,
    0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b11111, 0b11111,
    0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b11111, 0b11111, 0b11111,
    0b00000, 0b00000, 0b00000, 0b00000, 0b11111, 0b11111, 0b11111, 0b11111,
    0b00000, 0b00000, 0b00000, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111,
    0b00000, 0b00000, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111,
    0b00000, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111,
    0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111
  };

  for (int i = 0; i < 8; i++)
    lcdSetCustomChar(i, chars + i*8);

  delay(100);
}

void lcdSpecMap(int x, int value, int numBars)
{
  int8_t i, val;

  // map value of 0 - maxSpecValue → 0→7, 0→15, 0→23, 0→31
  if (value > maxSpecValue)
    value = maxSpecValue;

  value = map(value, 0, maxSpecValue, 0, 8*numBars);

  for (i = 0; i < numBars; i++)
  {
    lcdGotoXY(x, i);
    val = value - (8 * (numBars - 1 - i));

    if (val <= 0)
      val = ' ';
    else if (val > 8)
      val = 7;
    else
      val -= 1;
    LCD.print(val, BYTE);
  }
}

void doLCDSpec(void)
{
  // prepare for up to 23 bands
  uint8_t v[23];

  rmp3.getspectrumanalyzer(v);

  for (uint8_t i=0; i<10; i++)
  {
//    lcdSpecMap(i, v[i], 4);
    // we are displaying each band in two columns.
    // so, band 0 goes on columns 0 and 1, band 1 on 2 and 3, band 2 on 4 and 5, etc...
    lcdSpecMap(2*i, v[i], 4);
    lcdSpecMap(2*i+1, v[i], 4);
  }
}


void setup(void)
{
  Serial.begin(9600);
  Serial.println("Started");

  LCD.begin(9600);
  
  for(int i = 0; i < 10; i++)
  {
    LCD.print(18, BYTE);
    delay(20);
  }
  
  LCD.print(124, BYTE);
  LCD.print(16, BYTE);
  delay(20);

  LCD.begin(38400);
  rmp3_s.begin(38400);
  
  pinMode(2, INPUT);
  pinMode(3, INPUT);

  lcdCustomChars();
  lcdClear();

  Serial.println("Starting sync");
  rmp3.sync();
  filecommands.sync();
  Serial.println("Done sync");
  
  lcdGotoXY((lcdWidth - 5)/2, 0);
  LCD.print("Ready");
}


void playTrack(void)
{
  char mp3path[128];

  numfiles = filecommands.filecount(MP3FILTER);

  Serial.print("MP3 count: ");
  Serial.println(numfiles, DEC);
 
  // play a file (random)
  strcpy(mp3path, MP3PATH);
  filecommands.entrytofilename(mp3path + strlen(mp3path), 127, MP3FILTER, random(0, numfiles));

  Serial.println(mp3path);
  rmp3.playfile(mp3path);

  rmp3.setspectrumanalyzer(bandfreqs, 10);

  Serial.println("Playing");
}


void loop(void)
{
  int i;
  static char status = 'S';

  status = rmp3.getplaybackstatus();

  while (status == 'P')
  {
    doLCDSpec();

    status = rmp3.getplaybackstatus();
  }

  if (status == 'S')
  {
    lcdGotoXY((lcdWidth - 7) / 2, 0);
    LCD.print("Stopped");
    if (filecommands.status() == 0)  // card is inserted and waiting
      playTrack();
    status = rmp3.getplaybackstatus();
  }
}
```

Please, if you have any questions, don't hesitate to ask.

