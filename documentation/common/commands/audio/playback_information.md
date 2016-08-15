---
layout: single
title: Playback Information
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

This displays the information about the file currently playing.

## Format

`PC` `I`

## Parameters

No parameters.

## Response Format

*`response`*

*`response`* is of the format: *`ttt`*`«sp»`*`ss`*`«sp»`*`bbb`*`«sp»`*`M`*

where:

  * *`ttt`* is the current time position in the file, given in seconds.  If playback is stopped, this value is 0.
  * *`ss`* is the MP3 sample rate.  This value can be one of 32, 44, or 48 (32 kHz, 44.1 kHz, and 48 kHz respectively).
  * *`bbb`* is the MP3 bit rate.  This value can range from 32 up to 320, indicating 32 kbps up to 320 kbps.  If the MP3 is VBR, this value will change often during playback.
  * *`M`* is the stereo encoding mode.  It can be one of:
    * `S` for stereo encoding
    * `M` for mono encoding
    * `J` for joint stereo encoding

## Example

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">PC I</div>
<div class="wrap wrap_response">92 44 128 S</div>
</div>
