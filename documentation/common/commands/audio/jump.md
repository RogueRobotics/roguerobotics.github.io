---
layout: single
title: Jump
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

Jump to a new time location in a audio file.

## Format

`PC` `J`  *`newtime`*

## Parameters

  * *`newtime`* is the new time, in seconds, at which the playback will continue.  If the value is 0, playback will start at the beginning.  If the value is greater than the duration of the current audio file, then playback will stop.

***IMPORTANT:*** The calculation used for jumping to the new position is based on CBR MP3 audio files.  If a VBR MP3 file or PCM file is used, then the *`newtime`* position will more than likely be incorrect, and the time returned by the [Playback Status](playback_status.html) and [Playback Information](playback_information.html) commands will be incorrect.
{: .notice--warning}

## Response Format

*`NULL`*

## Example

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">PC J 143</div>
</div>
