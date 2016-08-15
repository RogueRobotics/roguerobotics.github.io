---
layout: single
title: Playback Status
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

This shows the current playback status.  You can use this command to monitor when the current file has finished playing.

## Format

`PC` `Z`

## Parameters

No parameters.

## Response Format

*`response`*

*`response`* is of the format: *`C`*`«sp»`*`ttt`*`«sp»`*`nnn`*

where:

  * *`C`* indicates playback status and is one of:
    * `P` for playing
    * `S` for stopped
    * `D` for paused
  * *`ttt`* is the current time position in the file, given in seconds.  If playback is stopped, this value is 0.
  * *`nnn`* is the current loop number.

## Example

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">PC Z</div>
<div class="wrap wrap_response">P 6 1</div>
</div>
