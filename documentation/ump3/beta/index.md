---
layout: single
title: uMP3 Beta Firmware
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

Here is where you'll find information on the new firmware releases for the [uMP3 Playback Module]({{ base_path }}/documentation/ump3/).

## 111.09-b001

### What's new

1. Fixed: "T"ime returned time even when parameters given.
1. Fixed: Temporary settings not loading from config file.
1. Fixed: 7 bit trigger repeats when held low.
1. Added: New low power mode
  * Cuts power consumption in half, when idle
  * Expect less than 5 mA
  * RTC still runs, keeping time
  * Mode is activated with setting "Z"
    * `S Z 1` - sets into low power mode.
    * The setting remains active until cleared.

### Download

[Rogue Code - uMP3 Beta Downloads - uMP3-111-09-b001](http://code.google.com/p/rogue-code/downloads/list?q=ump3-111-09-b001)

