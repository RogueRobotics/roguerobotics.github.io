---
layout: single
title: Playback Speed Change
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

This command changes the playback speed.  If a value less than 100 is given, the file will play faster (and thus the pitch will be higher), and a value greater than 100 will play the file slower (with a lower pitch).  If the speed parameter is not received, then the playback will return to normal (100%).

**INFO:** The playback speed will only return to 100% playback speed if the rMP3 is reset/powered-up, or if this command is sent without the speed value.
{: .notice--info}

***IMPORTANT:*** This command is experimental as it tricks the VS10xx decoder into changing the playback speed, and as such, this is not necessarily a good/efficient way to change playback speed.  The audio will more than likely create pops and glitches.  Use at your own discretion.
{: .notice--warning}

## Format

`PC` `X` [*`speed`*]

## Parameters

  * *`speed`* is an optional parameter between 90 and 250.  Values outside these limits will produce unpredictable results.
    * This value represents the fractional speed increment for playback (percentage).
    * e.g. a value 90 will play the file in 90% of the time it takes to play normally (i.e. faster), whereas a value of 120 will play the file in 120% of the time it takes to play normally (i.e. slower).
    * A value of 0 (zero) or omitting this value will return playback speed to normal (100%).

## Response Format

*`NULL`*

## Example

Change the current playback speed to 95% (i.e. faster):

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">PC X 95</div>
</div>
