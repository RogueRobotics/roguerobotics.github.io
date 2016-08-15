---
layout: single
title: Play Tone
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

This command plays a tone derived from the parameter.  The tone is played
indefinitely until the rMP3 receives either the **Play Tone** command again with no
parameter, or the [Stop](stop.html) command. If a file is being played when the
**Play Tone** command is received, playback will resume if the **Play Tone**
command is received with no parameter.

**Note:** Tones are generated using the VS10xx decoder's "Sine Test".  The range and quantization of frequencies are pretty limited.  For reference, here is an entire [table of frequencies]({{ base_path }}/documentation/common/vs10xx_table_of_frequencies.html).

## Format

`PC` `T` [*`tone`*]

## Parameters

* *`tone`* is a value between 0 and 255.
  * To calculate the *`tone`* value:
    * *Tone Frequency* = *Base Frequency* * *d*/128
      * This means that there can be more than one combination of *Base Frequency* and *d* for a *Tone Frequency*.
    * *`tone`* = *Base Frequency Index* + *d*
    * *d* is the divider value (1 → 31), which will give a range of divider fractions (1/128 → 31/128).  A divider value of 0 will produce no sound.
    * Base Frequency Index Table:

|Base Frequency  |  Hexadecimal  |  Decimal   |
|:---------------|:--------------|:-----------|
|44100 Hz        |  0x00         |  0         |
|48000 Hz        |  0x20         |  32        |
|32000 Hz        |  0x40         |  64        |
|22050 Hz        |  0x60         |  96        |
|24000 Hz        |  0x80         |  128       |
|16000 Hz        |  0xA0         |  160       |
|11025 Hz        |  0xC0         |  192       |
|12000 Hz        |  0xE0         |  224       |

Example, to play a 6000 Hz tone:

* *Base Frequency* = 48000 Hz, therefore *Base Frequency Index* = 32.
* *d* = 16.
* *Tone Frequency* = 48000 * 16/128 = 6000 Hz.
* *tone* = 32 + 16 = 48
  * `PC T 48`

## Response Format

*`NULL`*

## Example

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">PC T 48</div>
</div>
