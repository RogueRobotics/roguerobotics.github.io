---
layout: single
title: rMP3 Settings Table
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Communication Settings

|  Setting  |  Name                   |  Value        |  Description (**default**)  |
|:----------|:------------------------|:------------:|:----------------------------|
|D  | Baud/Bit Rate                   | **0**         | **9600 bps** |
|                                    || 1             | 19200 bps |
|                                    || 2             | 38400 bps |
|                                    || 3             | 57600 bps |
|                                    || 4             | 115200 bps |
|                                    || 5             | 2400 bps |
|                                    || 6             | 4800 bps |
|                                    || 7             | 230400 bps |
|                                    || 8             | 460800 bps |
|P  | Prompt Character                | 1 to 254      | **62 ('>')** |
|R  | Response Delay                  | **0** to 254  | Time in 10 ms increments (e.g. 5 = 50 ms) <br />**0 = No response delay (immediate response)** |

## Non-volatile Playback Settings

|  Setting  |  Name                   |  Value        |  Description (**default**)  |
|:----------|:------------------------|:------------:|:----------------------------|
|V  | Start-up Playback Volume        | 0 to 254      | Volume setting (in -0.5 dB increments) for when the unit powers up.  Default is **16** (i.e. -8 dB)   |
|O  | Repeat/Loop Count               | 0 to 254      | 0 = Infinite loop (until interrupted or stopped) |
|                                                   ||| **1 = Single** |
|                                                   ||| 2 to 254 = number of loops to play |
|B  | Treble/Bass Boost               | **0** to 65535  | See [Boost]({{ base_path }}/documentation/common/settings#boost) |

## File System Settings

|  Setting  |  Name                   |  Value        |  Description (**default**)  |
|:----------|:------------------------|:-------------:|:----------------------------|
|C  | Copy Progress Style             | **0**         | **none** |
|                                    || 1             | progress hash "#" every 2048 bytes |
|                                    || 2             | total bytes copied & copy rate |
|                                    || 3             | progress hash, bytes copied & copy rate |
|E  | Read/Write Line Terminator      | **0**         | **CR** |
|                                    || 1             | LF |
|                                    || 2             | CRLF |
|T  | Write Time-out                  | **0** to 254  | Time in 10 ms increments (e.g. 20 = 200 ms) <br />**0 = No time-out (waits indefinitely)** |
|L  | Directory Listing Style         | **0**         | **old style** |
|                                    || 1             | new style |

## Input/Output Interface Settings

|  Setting  |  Name                   |  Value        |  Description (**default**)  |
|:----------|:------------------------|:-------------:|:----------------------------|
|S  | Input Style                     | **0**         | **Input ignored** |
|                                    || 1             | 8 Button/Switch Input |
|                                    || 2             | 7 Bit plus Trigger Input |
|H  | Hardware Busy Indicator         | **0** or 1    | "D" pin becomes a hardware busy logic output (high = playing)  |
|N  | Input File Number Offset        | **0** to 9872  | Numbering offset for Input files |
|U  | Input Non-stop Control          | 8 bit mask    | In 8 Button/Switch mode, this 8 bit mask indicates which buttons will be considered non-stop (a 1 in the mask indicates non-stop).  In 7 Bit mode, anything > 0 will indicate non-stop playback.   |
|A  | Input Polarity Control          | 8 bit mask    | Used only in 8 Button/Switch mode, this 8 bit mask indicates the polarity of input for each individual input pin (a 1 in the mask indicates positive edge triggering).   |
|M  | Switch Input Debounce Mode      | **0** or 1    | Used only in 8 Button/Switch mode, this setting will turn on a simple 40 ms debounce algorithm for the inputs   |
