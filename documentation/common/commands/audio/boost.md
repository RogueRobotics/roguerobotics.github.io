---
layout: single
title: Boost
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

Sets a boost value for bass and/or treble.

**INFO:** To set the default start-up boost value, use [Settings]({{ base_path }}/documentation/common/commands/settings.html) for non-volatile (start-up) settings.
{: .notice--info}

## Format

`PC` `B` [*`boost`*]

## Parameters

* *`boost`* is a value between 0 and 65535.
  * Treble boost can be set from -12 to +10.5 dB boost (in 1.5 dB steps) at and above frequencies ranging from 1000 to 15000 Hz (in 1000 Hz steps).
  * Bass boost can be set from 0 to 15 dB boost (in 1 dB steps) below frequencies ranging from 20 to 150 Hz (in 10 Hz steps).
  * To calculate the value for *`boost`*:
    * *treble boost* = ((*treble amplitude*/1.5 + 8) * 16) + *treble frequency*/1000
    * *bass boost* = ((*bass amplitude* * 16) + (*bass frequency*/10)
    * *boost* = *treble boost* * 256 + *bass boost*
  * A *`boost`* value of 0 will turn off the audio enhancement.

## Response Format

| *`NULL`* | Audio boost set to *`boost`* |
| *`response`* | When no parameters are given, then *`response`* is the current boost setting |

## Example

To set the treble boost to +10.5 dB at and above 10 kHz, and set the bass boost to +15 dB below 60 Hz:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">PC B 31478</div>
</div>

To retrieve the current boost value:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">PC B</div>
<div class="wrap wrap_response">31748</div>
</div>

To turn off boost:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">PC B 0</div>
</div>
