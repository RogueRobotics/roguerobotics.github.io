---
layout: single
title: rMP3 Audio with Synchronized Lyrics
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

Here is an example Arduino sketch that utilizes both the playback and SD card functions of the rMP3.

The sketch plays a song, and displays lyrics.

The lyrics are read from a standard LRC file, which you either already have, or you can easily download ([MiniLyrics](http://www.crintsoft.com/) is a great app for lyrics).  LRC files have a time stamp and a lyric per each line.  The time stamps are synchronized using a 1/100th second timer (Timer2) on the Arduino.

<iframe src="https://player.vimeo.com/video/7862121" width="640" height="480" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<p><a href="https://vimeo.com/7862121">rMP3 Playback and Lyrics Example</a> from <a href="https://vimeo.com/roguerobotics">Rogue Robotics</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

----

## Sketch

Here is the source code:

`rMP3_Lyrics.pde`

```cpp
#include <NewSoftSerial.h>
#include <RogueMP3.h>
#include <RogueSD.h>
#include <avr/io.h>
#include <avr/interrupt.h>

NewSoftSerial rmp3_s(6,7);

RogueSD filecommands(rmp3_s);
RogueMP3 rmp3(rmp3_s);

volatile uint32_t <u>h</u>;

const char P_song[] PROGMEM = "/Daft Punk - Technologic.mp3";
const char P_lyricfile[] PROGMEM = "/Daft Punk - Technologic.lrc";

#define LRCHANDLE 1
#define MAX_LYRIC_LINE 96

char lyricline[MAX_LYRIC_LINE];

int32_t getnumber(char **str, uint8_t base)
{
  uint8_t c, neg = 0;
  uint32_t val;

  val = 0;
  c = **str;
  
  if(c == '-')
  {
    neg = 1;
    (*str)++;
    c = **str;
  }
  
  while(((c >= 'A') && (c <= 'Z'))
      || ((c >= 'a') && (c <= 'z'))
      || ((c >= '0') && (c <= '9')))
  {
    if(c >= 'a') c -= 0x57;              // c = c - 'a' + 0x0a, c = c - ('a' - 0x0a)
    else if(c >= 'A') c -= 0x37;         // c = c - 'A' + 0x0A
    else c -= '0';
    if(c >= base) break;

    val *= base;
    val += c;
    (*str)++;
    c = **str;
  }
  return neg ? -val : val;
}


boolean open_lyricfile(const char *lrcfile)
{
  if (filecommands.open_P(LRCHANDLE, P_lyricfile, OPEN_READ) > 0)
    return true;
  else
    return false;
}


// return value:
// < 0 EOF
// 0 bad read, no data - skip
// > 0 good read
int8_t read_lyric(uint32_t *nexttime, char **nextlyric)
{
  char *p;
  char *f;
  uint32_t time, time_fraction;

  if (filecommands.readln(LRCHANDLE, MAX_LYRIC_LINE, lyricline) >= 0)
  {
    // parse values
    // format: [mm:ss.xxx] lyric text
    // mm: minutes
    // ss.xxx: seconds and fractions of seconds
    // xxx is optional, and can be 2 or 3 decimal places

    p = lyricline;
    
    if (*p == '[')
    {
      // good start
      // get minutes
      time = getnumber(&(++p), 10) * 60 * 100;

      if (*p == ':')
      {
        // get seconds

        time += getnumber(&(++p), 10) * 100;

        if (*p == '.')
        {
          // we have optional fractions of seconds
          f = ++p;  // for later (number of decimal places)
          time_fraction = getnumber(&p, 10);

          if ((p - f) == 2)
          {
            time += time_fraction;
          }
          else if ((p - f) == 3)
          {
            time += time_fraction/10;
          }
          else
          {
            // what the heck?
            return 0;
          }
          
          // we now have the time in hundredths of seconds in "time"
        }

        if (*p == ']')
        {
          // got closing
          // drop any spaces between
          while (*(++p) == ' ');
          *nextlyric = p;
          *nexttime = time;
          return 1;
        }
        else
        {
          // what the heck? no . or ] - whacky stuff
          return 0;
        }
      }
      else
      {
        // missing : and seconds... strange
        return 0;
      }
    }
    else
    {
      // bail out, no [ at the start
      return 0;
    }
  }
  else
  {
    // EOF
    return -1;
  }
}



void setup()
{
  Serial.begin(9600);
  rmp3_s.begin(9600);

  rmp3.sync();
  filecommands.sync();

  TCCR2A = 0b0000010;
  OCR2A = (F_CPU/1024/100)-1;
  TIMSK2 = 0b0000010;
  TCCR2B = 0b0000111; // ck/1024 prescalar
}


ISR(TIMER2_COMPA_vect)
{
  <u>h</u>++;
}



void loop()
{
  // POC - single run on a single file
  
  uint32_t starttime, nexttime; 
  char *nextlyric;
  boolean playing;
  int8_t lyricstatus;

  // nexttime = milliseconds into playback to set pattern
 
  // start
  playing = (rmp3.playfile_P(P_song) == 0) ? true : false;

  if (playing)
  {
    if (open_lyricfile(P_lyricfile))
    {
      starttime = <u>h</u>;
  
      lyricstatus = 1;
  
      while (playing && lyricstatus >= 0)
      {
        lyricstatus = read_lyric(&nexttime, &nextlyric);

        // if lyricstatus == 0, we just skip - it's a bad line or info line
        if (lyricstatus > 0)
        {
          Serial.print("Waiting for: ");
          Serial.print(nexttime, DEC);
  
          // just wait here until we hit the next time (if we do!)
//          while ((millis() - starttime) < (nexttime + t_offset))
          // millis() is seriously hobbled - let's use our own
          while((<u>h</u> - starttime) < nexttime)
          {
            // if we are still playing
            if (rmp3.getplaybackstatus() == 'P')
            {
              // do whatever
            }
            else
            {
              // get outta here!
              playing = false;
              Serial.println(); Serial.println("Playback stopped!");
              break;
            }
          }
        
          // ok, hit pattern time - set the pattern
          if (playing)
          {
            Serial.print(" - ");
            Serial.println(nextlyric);
          }
        }
        else if (lyricstatus < 0)
        {
          // no more lyrics!!
          filecommands.close(LRCHANDLE);
          Serial.println("Out of lyrics!");
        }
        // otherwise, just get the next lyric
      }
    }
    else
    {
      // couldn't open lyrics file
      Serial.println("Couldn't open lyrics file.");
    }
  }
  else
  {
    // couldn't play the song
    Serial.println("Couldn't play the song");
  }

  // DONE... for now.
  Serial.println("DONE");
  for (;;);
}
```

If you need it, here is the settings file (either UMP3.CFG or RMP3.CFG, depending on which module your using):

```
D0
```

