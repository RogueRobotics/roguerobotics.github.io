---
layout: single
title: RogueMP3 Arduino Library
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Rogue Robotics MP3 Playback Module Interface Library Usage

**DOWNLOAD:** <http://code.google.com/p/rogue-code/downloads/list?q=library+roguemp3>

This Library has been provided to ease the communications with the [Rogue Robotics](http://www.roguerobotics.com/) MP3 Playback Modules:

* [uMP3 Playback Module](http://www.roguerobotics.com/products/ump3)
* [rMP3 Playback Module](http://www.roguerobotics.com/products/rmp3)

The MP3 Playback modules can communicate through standard TTL serial at speeds from 2400 bps up to 460800 bps.   [SD](http://en.wikipedia.org/wiki/Secure_Digital_card){:target="_blank"} or [SDHC](http://en.wikipedia.org/wiki/Secure_Digital_card#SDHC){:target="_blank"} cards are accepted and can be formatted in [FAT12](http://en.wikipedia.org/wiki/File_Allocation_Table#FAT12){:target="_blank"}, [FAT16](http://en.wikipedia.org/wiki/File_Allocation_Table#Initial_FAT16){:target="_blank"} or [FAT32](http://en.wikipedia.org/wiki/File_Allocation_Table#FAT32){:target="_blank"}.  [MicroSD](http://en.wikipedia.org/wiki/MicroSD){:target="_blank"} and [MiniSD](http://en.wikipedia.org/wiki/MiniSD){:target="_blank"} cards can be used with an appropriate adapter.

Data can be stored on or retrieved from cards using a card reader on a computer.

## uMP3 firmware

The library will work with earlier versions of firmware for the uMP3 (≤ 110.12), but performance will be better with later firmware.  Information on updating module firmware can be found here:

* [Updating Rogue Module Firmware]({{ base_path }}/faq.html#how-do-i-update-the-firmware-on-the-rmp3)

## Instantiation

```cpp
// Example for connecting to a Rogue Robotics uMP3.
// Arduino pin 4 is connected to the uMP3's "T" pin
//         pin 5 is connected to the uMP3's "R" pin
#include <NewSoftSerial.h>
#include <RogueMP3.h>

NewSoftSerial ump3_serial(4, 5);

RogueMP3 ump3(ump3_serial);

void setup()
{
  ump3_serial.begin(9600);
  
  ump3.sync();
}
```


## Datatypes/Structures

* `playbackinfo` - A `struct` which contains playback information.
  * <code cpp>struct playbackinfo {
                    uint16_t position;
                    uint8_t samplerate;
                    uint16_t bitrate;
                    char channels;
                  };</code>


## Properties

* `LastErrorCode` - If an error occurred in a previous method, this will contain the most recent error code.

## Methods

* `sync()` - synchronizes communications with the module.
* `changesetting(char setting, unsigned int value)` - changes a setting.
* `unsigned int getsetting(char setting)` - gets a setting.
* `int version()` - gets the version of the module firmware.
* `byte getmoduletype()` - returns the module type (uMMC = 1, uMP3 = 2, rMP3 = 3).
* `playfile(char *filename)` - plays a file.
* `playfile_P(prog_char *filename)` - plays a file (string is in PROGMEM).
* `unsigned int getvolume()` - gets the current volume.
* `setvolume(byte newvolume)` - sets the volume (both left and right to same value).
* `setvolume(byte leftvolume, byte rightvolume)` - sets the volume for each channel.
* `setloop(byte loopcount)` - sets the individual play loop count.
* `jump(unsigned int newtime)` - jumps to a new time in the file (`newtime` is in seconds).
  * NOTE: only works on CBR MP3 files.  Unpredictable results on VBR or non-MP3 files.
* `setboost(...)` - sets the audio boost enhancement.
* `fade(byte newvolume, unsigned int fadems)` - fades the volume to `newvolume`, over `fadems` milliseconds.
* `fade_lr(byte leftvolume, byte rightvolume, unsigned int fadems)` - fades the given volume over `fadems` milliseconds.
* `playpause()` - plays (if paused) or pauses playback.
* `stop()` - stops playback.
* `playbackinfo getplaybackinfo()` - gets the current playback info.
* `char getplaybackstatus()` - gets the current playback status: 'P' = playing, 'D' = paused, 'S' = stopped.

