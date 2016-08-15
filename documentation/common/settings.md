---
layout: single
title: Rogue Module Settings
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Overview

This page is a detailed list of all of the available settings for Rogue Robotics Modules (uMMC, uMP3, and rMP3).  Please see the [**Settings Command**]({{ base_path }}/documentation/common/commands/settings.html) for more details on how to change the settings.

(TL;DR: Just note that the uMMC uses the `S` command to change settings, while the uMP3 and the rMP3 use the `ST` command.)

## File System Settings

### Copy Progress Style

**uMMC, uMP3, rMP3**

Setting name: `C`

Default: **0** (no detail)

When using the **Copy** command, the response for the command is formatted differently
depending on the value of this setting.

Range: 0 → 3

| Value   | Response |
|:--------|:---------|
| 0       | *`NULL`* |
| 1       | `#########...####` |
| 2       | `nn..nn bytes copied at r..rr bytes/second` |
| 3       | `#####...####nn..nn bytes copied at r..rr bytes/second` |

If the value is 0, then no response is given upon a successful copy.

If the value is 1 or 3, then a hash mark `#` is sent every 2048 bytes copied.

If the value is 2 or 3, upon completion of the copy process, a summary is provided (shown above).

### Read/Write Line Ending

**uMMC, uMP3, rMP3**

Setting name: `E`

Default: **0** (`«cr»`)

The **Read Line** command reads up to the terminator selected through this setting.

The **Write Line** command appends the appropriate EOL (End Of Line) terminator selected by this setting, and write the data to the file.

Range: 0 → 2

| Value   | Response |
|:--------|:---------|
| 0       | `«cr»`   |
| 1       | `«lf»`   |
| 2       | `«cr»«lf»` |

### Write Time-out

**uMMC, uMP3, rMP3**

Setting name: `T`

Default: **0** (no time-out, waits indefinitely)

If this setting's value is greater than 0 (zero), then if the time taken between sending bytes exceeds that value (in tens of milliseconds), the **Write** (**Write Line**) command will terminate, write the accepted bytes to the file, and return to the command prompt.  No EOL terminator will be written.  No error will be returned.

Range: 0 → 254

### Directory Listing Style

**uMMC, uMP3, rMP3**

Setting name: `L`

Default: **0** (basic)

The response format for the **List Directory** command depends on the value of this setting.

Range: 0 or 1

`L` = 0 (basic):

```
«sp»D | ss..sss filename1«cr»
D | ss..sss filename2«cr»
...
D | ss..sss filenameN«cr»
```

where:

  * `D` indicates a directory
  * `ss..sss` is the size of the file
  * `filenameN` is the filename or directory name

`L` = 1 (detailed):

```
«sp»DRHSA yyyy/mm/dd hh:mm:ss ss..sss filename1«cr»
DRHSA yyyy/mm/dd hh:mm:ss ss..sss filename2«cr»
...
DRHSA yyyy/mm/dd hh:mm:ss ss..sss filenameN«cr»
```

where:

  * `DRHSA` are the attributes for the file.  If the attribute is not set, the value is "`-`".  `D` indicates a directory.
  * `yyyy/mm/dd hh:mm:ss` is the modification date of the file/directory.
  * `filenameN` is the filename or directory name


## Communication Settings

### Serial Bitrate

**uMMC, uMP3, rMP3**

Setting name: `D`

Default: **0** (9600 bps)

Rogue modules communicate using asynchronous serial.  This setting sets the rate at which the
module communicates.

Range: 0 → 8

|Value  |Bitrate     |
|:------|:-----------|
|0      |9600 bps    |
|1      |19200 bps   |
|2      |38400 bps   |
|3      |57600 bps   |
|4      |115200 bps  |
|5      |2400 bps    |
|6      |4800 bps    |
|7      |230400 bps  |
|8      |460800 bps  |

Example: Set serial bitrate to 57600 bps on a uMMC

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">S D 3</div>
</div>

Example: Set serial bitrate to 115200 bps on a uMP3 or rMP3

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">ST D 4</div>
</div>

### Prompt Character

**uMMC, uMP3, rMP3**

Setting name: `P`

Default: **62** (`>`)

This is the character that is returned when the module is ready to receive a new command.  You can use this character to synchronize communications.

Range: 1 → 254

Type: ASCII character value.

Example: Set prompt to '%' on uMMC

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">S P 37</div>
</div>

Example: Set prompt to ']' on uMP3/rMP3

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">ST P 93</div>
</div>

### Response Delay

**uMMC, uMP3, rMP3**

Setting name: `R`

Default: **0** (no delay)

This is a delay that is introduced between when a command is received by the module and when the command begins processing.  This is especially useful for controllers that need time to set up their serial input (e.g. Basic Stamp).

Range: 0 → 254

Type: Time in 10 millisecond increments (e.g. 5 = 50 ms).

Example: Set response delay to 50 ms on uMMC

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">S R 5</div>
</div>

Example: Set response delay to 120 ms on uMP3 or rMP3

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">ST R 12</div>
</div>

## Non-volatile Playback Settings

### Volume

**uMP3, rMP3**

Setting name: `V`

Default: **16, 16** (-8 dB)

Sets the start-up volume for the rMP3.  You can provide both the left and right volume settings.

Range: Left: 0 → 254, Right: 0 → 254

Type: Volume attenuation in -0.5 dB increments (e.g. 16 = -8 dB).

Example: Set volume to L:0 dB, R: -4 dB on uMP3 or rMP3

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">ST V 0 8</div>
</div>

### Loop Count

**uMP3, rMP3**

Setting name: `O`

Default: **1** (play once)

Sets the default loop count for playback.  This is the number of times a file is repeated.

Range: 0 → 254

Type: Number of repeats.

Note: 0 means infinite repeat - continuous looping of playback.  A value of 1 means to play the file once.

Example: Set default loop count to 2 on uMP3 or rMP3

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">ST O 2</div>
</div>

### Boost

**uMP3, rMP3**

Setting name: `B`

Default: **0** (no boost)

Sets the default [Boost](commands/audio/boost.html) value.  This is an audio enhancement provided by the decoder which boosts the bass and/or treble response.

  * Treble boost can be set from -12 to +10.5 dB boost (in 1.5 dB steps) at and above frequencies ranging from 1000 to 15000 Hz (in 1000 Hz steps).
  * Bass boost can be set from 0 to 15 dB boost (in 1 dB steps) below frequencies ranging from 20 to 150 Hz (in 10 Hz steps).

The Boost value is calculated as follows:

  * *treble boost* = (*treble amplitude[see table below]* * 16) + *treble frequency*/1000
  * *bass boost* = ((*bass amplitude* * 16) + (*bass frequency*/10)
  * *boost* = *treble boost* * 256 + *bass boost*

A value of 0 will turn off the audio enhancement.

Range: 0 → 65536

Note: Treble amplitude is a [twos-complement](http://en.wikipedia.org/wiki/twos-complement){:target="_blank"} value for the amplitude.

|Treble amplitude value  |Twos-complement  | Binary  |Hexadecimal  |Treble boost (dB)  |
|:-----------------------|:----------------|:--------|:------------|:------------------|
|  15  |  -8  |  `1111`  |  F  |  -12 dB            |
|  14  |  -7  |  `1110`  |  E  |  -10.5 dB          |
|  13  |  -6  |  `1101`  |  D  |  -9 dB             |
|  12  |  -5  |  `1100`  |  C  |  -7.5 dB           |
|  11  |  -4  |  `1011`  |  B  |  -6 dB             |
|  10  |  -3  |  `1010`  |  A  |  -4.5 dB           |
|   9  |  -2  |  `1001`  |  9  |  -3 dB             |
|   8  |  -1  |  `1000`  |  8  |  -1.5 dB           |
|   0  |   0  |  `0000`  |  0  |  0 dB (boost off)  |
|   1  |   1  |  `0001`  |  1  |  +1.5 dB           |
|   2  |   2  |  `0010`  |  2  |  +3 dB             |
|   3  |   3  |  `0011`  |  3  |  +4.5 dB           |
|   4  |   4  |  `0100`  |  4  |  +6 dB             |
|   5  |   5  |  `0101`  |  5  |  +7.5 dB           |
|   6  |   6  |  `0110`  |  6  |  +9 dB             |
|   7  |   7  |  `0111`  |  7  |  +10.5 dB          |

Type: Boost encoded value.

Example:

Treble boost frequency: 10 kHz (and above)<br />
Treble boost amplitude: +10.5 dB<br />
Bass boost frequency: 60 Hz (and below)<br />
Bass boost amplitude: +15 dB<br />

```
treble boost = (7 * 16) + 10000/1000
             = 112 + 10 = 122
bass boost   = (15 * 16) + 60/10
             = 240 + 6 = 246
Boost value  = 122 * 256 + 246
             = 31478
```

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">ST B 31478</div>
</div>

## Input/Output Interface Settings

### Input Style

**uMP3, rMP3**

Setting name: `S`

Default: **0** (no input style)

Sets the input interface style.  See the [Input Interface]({{ base_path }}/documentation/ump3/input_interface.html) section for more information.

Range: 0 → 2

|Value  |Style                                     |
|:------|:-----------------------------------------|
|0      |No input style (input interface ignored)  |
|1      |8 Button/Switch interface                 |
|2      |7 Bit plus Trigger interface              |

Example: Set input style to 7 Bit plus Trigger (2)

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">ST S 2</div>
</div>

### Hardware Busy Indicator

**uMP3, rMP3**

Setting name: `H`

Default: **0** (off)

Sets the "D" pin to be a hardware busy logic output (high when playing).

Range: 0 or 1

Type: Switch.

Example: Turn on Hardware Busy Indicator

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">ST H 1</div>
</div>

### Input File Number Offset

**uMP3, rMP3**

Setting name: `N`

Default: **0**

Sets the offset for the filenames used for the input interface.  For example, if the Button/Switch interface is being used, and the **Input File Number Offset** is set to 200, then all filenames will be offset by 200.  i.e. The filename for Button/Switch 2 will be `B0202.MP3`.

Range: 0 → 9872

Type: Offset.

Example: Set offset to 100

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">ST N 100</div>
</div>

### Input Non-stop Control

**uMP3, rMP3**

Setting name: `U`

Default: **0** (all inputs interruptable)

In 8 Button/Switch mode, this 8 bit mask indicates which buttons will be considered non-stop (a 1 in the mask indicates non-stop). In 7 Bit mode, anything > 0 will indicate non-stop playback.

Range: 0 → 255

Type: 8 bit mask.

Example: 

Set input pins 0 and 5 as non-stop ("uninterruptible"):

|  Binary Mask  |  Hex  |  Decimal  |
|:-------------:|:-----:|:---------:|
|  `00100001`   |  21   |  33       |

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">ST U 33</div>
</div>

### Input Polarity Control

**uMP3, rMP3**

Setting name: `A`

Default: **0** (negative edge triggering - i.e. when an input goes low, playback is triggered)

Used only in 8 Button/Switch mode, this 8 bit mask indicates the polarity of input for each individual input pin (a 1 in the mask indicates positive edge triggering).

Range: 0 → 255

Type: 8 bit mask.

Example: 

Set input pins 0 and 6 as positive edge triggered (the rest are negative edge triggered):

|  Binary Mask  |  Hex  |  Decimal  |
|:-------------:|:-----:|:---------:|
|  `01000001`   |  41   |  65       |

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">ST A 65</div>
</div>


### Switch Input Debounce Mode

**uMP3, rMP3**

Setting name: `M`

Default: **0** (no debouce)

Used only in 8 Button/Switch mode, this setting will turn on a simple 40 ms debounce algorithm for the inputs.

Range: 0 or 1

Type: Switch.

Example: Turn on debounce algorithm
<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">ST M 1</div>
</div>
