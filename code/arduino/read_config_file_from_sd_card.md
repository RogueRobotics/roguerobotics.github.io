---
layout: single
title: Read Config File From SD Card
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

This is an example sketch to show how to read a configuration file from an SD card.


`ConfigRead.pde`

```cpp
// Config file example
//
// Reads a config file line by line, until EOF
// This example has each config variable defined by a single character at
// the beginning of the line followed by an integer value.
// There can be optional whitespace (spaces or tabs) between the var name.
// Values may be negative.
// Unrecognized variable names == ignored line.
// Latest definition of a var name supercedes previous values.
// Maximum line length, including comments, is 100 bytes (can be adjusted)

// Example config file:
/*
# This line is ignored
 So is this line (since we don't define a single space as a var name)
N123 # Comments can go after 
N-1
N -2
N    10
NXXXX # this line will result in a 0 value
N234234234234234  # there is a limit to the size (32 bit signed value)
*/

#include <NewSoftSerial.h>
#include <RogueSD.h>

NewSoftSerial ummc_s(6, 7);
RogueSD ummc(ummc_s);

#define IGNOREWHITESPACE 1

int32_t getInt(char *line, uint8_t base)
{
  uint8_t c, neg = 0;
  uint8_t i = 0;
  uint32_t val;

  val = 0;

#if IGNOREWHITESPACE == 1
  while (line[i] == ' ' || line[i] == 0x09)
    i++;
#endif

  if (line[i] == '-')
  {
    neg = 1;
    i++;
  }
  
  c = line[i];

  while (((c >= 'A') && (c <= 'Z'))
      || ((c >= 'a') && (c <= 'z'))
      || ((c >= '0') && (c <= '9')))
  {
    if (c >= 'a') c -= 0x57;             // c = c - 'a' + 0x0a, c = c - ('a' - 0x0a)
    else if (c >= 'A') c -= 0x37;        // c = c - 'A' + 0x0A
    else c -= '0';
    if (c >= base) break;

    val *= base;
    val += c;
    c = line[++i];
  }

  return neg ? -val : val;
}

void setup(void)
{
  char linebuffer[100];
  int8_t filehandle = 0;
  int32_t value = 0;

  Serial.begin(9600);
  ummc_s.begin(9600);

  Serial.println("Initializing uMMC");
  ummc.sync();
  ummc.closeall();


  Serial.println("Opening /CONFIG.CFG");
  filehandle = ummc.open_P(PSTR("/CONFIG.CFG"), OPEN_READ);
  
  if (filehandle > 0)
  {
    while (ummc.readln(filehandle, 100, linebuffer) > 0)
    {
      if (linebuffer[0] == 'N')
      {
        value = getInt(&linebuffer[1], 10);
        Serial.print("N: ");
        Serial.println(value);
      }
      // else if (linebuffer[0] == 'X')
      // etc...
      // everything else is effectively ignored
      // This is an easy way to get 26 (or more if you use non-alpha chars for var names)
      // config vars.
    }
    
    ummc.close(filehandle);
  }
  else
  {
    Serial.println("Couldn't open /CONFIG.CFG");
  }
}

void loop(void)
{
}
```

