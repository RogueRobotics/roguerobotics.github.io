---
layout: single
title: Index
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

Here is where you'll find information on the new firmware releases for the [uMMC Serial Data Module]({{ base_path }}/documentation/ummc/).

## 102.09-b001

### What's new

1. Direct data logging mode (WYGIWIS((What You Get Is What It Stores)))
   * Data received on the serial port is logged directly to a file
      * Files are named: LOGnnnn.TXT
      * Up to 1000 files will be created (this may change later)
      * Files are incremented on each boot
   * The mode is activated using setting "K"
      * `S K 1` - sets the uMMC into data logging mode on next boot.
      * The setting remains until it is cleared.
   * Logs at any bit rate from 2400 bps up to 460800 bps
   * Escape from data logging mode by pulling "C" pin low
1. New low power mode
   * Cuts power consumption in half, when idle
   * Expect less than 5 mA
   * RTC still runs, keeping time
   * Mode is activated with setting "Z"
      * `S Z 1` - sets into low power mode.
      * The setting remains active until cleared.

### Download

[Rogue Code - uMMC Beta Downloads - uMMC-102-09-b001](http://code.google.com/p/rogue-code/downloads/list?q=ummc-102-09-b001)

### Notes

Below is an example `UMMC.CFG` file (put it in the root of the SD card) to put the uMMC into data logger mode.  The uMMC will automatically read the configuration and be in data logger mode.

e.g.:

* 4800 bps → `S D 6`
* data logger mode → `S K 1`
* low power mode → `S Z 1`

```
D6
K1
Z1
```