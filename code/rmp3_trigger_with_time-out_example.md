---
layout: single
title: rMP3 Trigger With Time-out Example
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

An Arduino user needed some help with triggering playback on the rMP3.

<http://www.arduino.cc/cgi-bin/yabb2/YaBB.pl?num=1286003769>

Simply:

  * Playback starts if the trigger is set.
  * If the trigger clears, a timer starts.
  * If the trigger stays clear and the timer runs out, playback stops.
  * If the trigger sets before the timer runs out, playback continues.
  * Tracks play in the order on the card, and playback stops when the last track is played.

Here's what I wrote to accomplish the task.

`rMP3_Trigger_with_Timeout_Example.pde`

```cpp
/******************************************
rMP3 Trigger with Time-Out Example

rMP3 Control Requirements
* Play songs in order when trigger is set.
* If trigger clears, start timer and stop
  playback if timer runs out.

Assumptions
* When timer runs out, playback starts
  at the beginning.
* Playback will continue if trigger re-sets
  before timer runs out.

******************************************/

#include <RogueSD.h>
#include <RogueMP3.h>
#include <NewSoftSerial.h>

// 30 second timeout
#define TIMER_MAX 30000
#define INPUT_PIN 8

// Objects
NewSoftSerial rmp3_serial(6, 7);

RogueMP3 rmp3(rmp3_serial);
RogueSD filecommands(rmp3_serial);

// global variables
int numberOfSongs;
int currentSong = 0;
boolean triggered = false;
boolean playing = false;
uint32_t triggerTimer = 0xffffffff - TIMER_MAX;
char filePath[96];

// consts
const char *directory = "/rMP3";

void setup()
{
  pinMode(INPUT_PIN, INPUT);
  digitalWrite(INPUT_PIN, HIGH);

  Serial.begin(9600);

  rmp3_serial.begin(9600);

  // synchronize audio player
  rmp3.sync();
  rmp3.stop();

  // synchronize file system controller
  filecommands.sync();

  Serial.println("rMP3 Synchronized.");

  // get the number of songs available
  strcpy(filePath, directory);
  strcat(filePath, "/");
  strcat(filePath, "*.mp3");

  numberOfSongs = filecommands.filecount(filePath);

  if (numberOfSongs < 0)
  {
    // rMP3 error
    if (filecommands.LastErrorCode == 8)
      Serial.println("No card inserted.");
    else
    {
      Serial.print("rMP3 Error Code: ");
      Serial.println(filecommands.LastErrorCode, HEX);
    }
    
    Serial.println("Reset required to continue.");
    for (;;);
  }

  Serial.print(numberOfSongs, DEC);
  Serial.println(" files available.");

  // rewind directory
  filecommands.opendir(directory);

  Serial.println("Awaiting trigger.");
}


// Play next song, if we can
void playNextSong()
{
  char filename[80];

  if (playing == true)
  {
    if (filecommands.status() == 0)
    {
      // card is inserted and good to go
      if (currentSong == 0)
      {
        // rewind directory
        filecommands.opendir(directory);
      }
  
      if (currentSong < numberOfSongs)
      {
        // get the next song
        filecommands.readdir(filename, "*.mp3");
  
        rmp3.playfile(directory, filename);
  
        Serial.print("Playing: ");
        Serial.print(directory);
        Serial.print('/');
        Serial.println(filename);
  
        currentSong++;
      }
      else
      {
        playing = false;
        currentSong = 0;
      }
    }
    else
    {
      if (filecommands.LastErrorCode == 8)
      {
        Serial.println("No card inserted.");
      }
      else
      {
        Serial.print("rMP3 Error Code: ");
        Serial.println(filecommands.LastErrorCode, HEX);
      }
      
      Serial.println("Reset required to continue.");
      for (;;);
    }
  }
}


// This is the function to check the input
boolean checkTrigger(void)
{
  if (digitalRead(INPUT_PIN) == HIGH)
    return true;
  else
    return false;
}


/******************************************
Main loop
******************************************/

void loop()
{
  char rMP3Status = rmp3.getplaybackstatus();

  // First, check the trigger
  if (checkTrigger())
  {
    if (triggered == false)
    {
      Serial.println("Trigger set.");
      if (playing == false)
      {
        // Start from the top
        playing = true;
        currentSong = 0;
      }
    }
    triggered = true;
  }
  else
  {
    if (triggered == true)
    {
      Serial.println("Trigger cleared.");

      triggered = false;
      triggerTimer = millis();
    }
    else
    {
      if ((millis() - triggerTimer) > TIMER_MAX)
      {
        if (playing == true)
        {
          playing = false;
          Serial.println("Playback stopped.");
        }

        if (rMP3Status == 'P')
        {
          // stop playback
          rmp3.stop();
        }
      }
    }
  }

  if (triggered == true || ((millis() - triggerTimer) < TIMER_MAX))
  {
    if (rMP3Status != 'P')
      playNextSong();
  }

  // Arbitrary delay
  delay(250);
}
```

