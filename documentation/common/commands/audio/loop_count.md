---
layout: single
title: Loop Count
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

Gets or sets the current loop count.  The range is from 0 to 254.  If the value is 0, then audio playback is looped continuously until a **Stop** command is received.

If no value is given, then the current loop count is returned.

**INFO:** To set the default loop count, use [Settings]({{ base_path }}/documentation/common/commands/settings.html) for non-volatile (start-up) settings.
{: .notice--info}

## Format

`PC` `O` [*`loopcount`*]

## Parameters

* *`loopcount`* is a value between 0 and 254.  Optional.

## Response Format

| *`NULL`* | Loop count set to *`loopcount`* |
| *`response`* | When no parameters are given, then *`response`* is the current loop count setting |

## Example

To set the loop count to 8:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">PC O 8</div>
</div>

To get the current loop count setting:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">PC O</div>
<div class="wrap wrap_response">8</div>
</div>
