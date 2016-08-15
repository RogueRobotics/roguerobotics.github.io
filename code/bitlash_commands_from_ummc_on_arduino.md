---
layout: single
title: Bitlash Commands From uMMC on Arduino
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

[Bitlash](http://bitlash.net/), written by Bill Roy, is pretty nifty.  It's essentially an interpreted language shell running on an Arduino.

It seems to me that Bitlash would benefit greatly from being able to read commands from an external memory card.

The uMMC connects to +5V and GND and pins 14 and 15 (analog 0 and 1 respectively).  Here's how it looks:

![uMMC on Arduino]({{ base_path }}/code/images/easy-ummc-on-arduino.jpg)

An example input file (named "0.bls"):

```
print "Hello, world!"
print 2+2
toggle13 := "d13 = !d13"
run toggle13,500
```

Here is the result:

```
> exec(0)
Hello, world!
4
saved
>
```

And the built-in LED on the Arduino (pin 13) is blinking.

In any case, here is my first stab at reading and running commands from an SD card in Bitlash.

`BitLash_uMMC.pde`

```cpp

// User functions are:
//  "sdver" - returns the uMMC version number and CPU free memory
//  "dir" - lists all the files in the root directory of the SD card
//  "exec(n)" - runs all the commands found in the file named "n.bls" in the root directory

#include "WProgram.h"
#include "bitlash.h"
#include "NewSoftSerial.h"
#include "RogueSD.h"

NewSoftSerial ummc_s(14, 15);
RogueSD ummc(ummc_s);

// A test function to show the uMMC version and the free memory
// (using the internal print command)
numvar sdver(void)
{
  Serial.print("uMMC Version: ");
  Serial.println(ummc.version(), DEC);
  Serial.print("Free mem: ");
  doCommand("print free");
}

// This function lists all the files in the root directory
void sdls(void)
{
  char filename[80];

  if (ummc.status() == 0)
  {
    ummc.opendir("/");
    while(ummc.readdir(filename, "*") == 0)
    {
      Serial.println(filename);
    }
  }
  else
  {
    Serial.print("uMMC error code: ");
    Serial.println(ummc.LastErrorCode, HEX);
  }
}

// Called by: "exec(n)" where n is the script number (0 → 9)
// The file is named "n.bls" in the root directory
// e.g. 0.bls
void sdexec(unumvar scriptnum)
{
  char strbuff[80];
  char filehandle;
  int len;

  if (scriptnum >= 0 && scriptnum <= 9)
  {
    if (ummc.status() == 0)
    {
      strbuff[0] = '0' + scriptnum;
      strbuff[1] = 0;
      strcat(strbuff, ".bls");

      filehandle = ummc.open(strbuff);

      if (filehandle > 0)
      {
        // read a line
        while ((len = ummc.readln(filehandle, 80, strbuff) > 0))
        {
          doCommand(strbuff);
        }

        ummc.close(filehandle);
      }
      else
      {
        Serial.print("error: script ");
        Serial.print(scriptnum, DEC);
        Serial.println(" does not exist");
      }
    }
    else
    {
      Serial.print("uMMC error code: ");
      Serial.println(ummc.LastErrorCode, HEX);
    }
  }
  else
  {
    Serial.println("error: script number must be between 0 and 9");
  }
}

void setup(void)
{
  ummc_s.begin(57600);
  ummc.sync();
  initBitlash(57600);		// must be first to initialize serial port

  addBitlashFunction("sdver", 0, (bitlash_function) sdver);
  addBitlashFunction("dir", 0, (bitlash_function) sdls);
  addBitlashFunction("exec", -1, (bitlash_function) sdexec);
}

void loop(void)
{
  runBitlash();
}
```


Here is the uMMC config file (if you need it).  Set for 57600 bps, and new listing style.

```
D3
L1
```

