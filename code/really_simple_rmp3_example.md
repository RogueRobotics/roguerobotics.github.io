---
layout: single
title: Really Simple rMP3 Example
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

Plug it in.  Turn it on.

```cpp
#include <NewSoftSerial.h>
#include <RogueMP3.h>

NewSoftSerial rmp3_serial(6, 7);
RogueMP3 rmp3(rmp3_serial);

void setup()
{
  Serial.begin(9600);
  rmp3_serial.begin(9600);
  
  rmp3.sync();

  rmp3.playfile("/Daft Punk - Technologic.mp3");
}

void loop()
{
}
```

