---
layout: single
title: Pause
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

Pauses playback.  If another **Pause** command is issued, playback is resumed.  The [Playback Status](playback_status.html) or [Playback Information](playback_information.html) commands can be used to find the current playback status.

## Format

`PC` `P`

## Parameters

No parameters.

## Response Format

*`NULL`*

## Example

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">PC P</div>
</div>
