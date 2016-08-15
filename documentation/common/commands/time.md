---
layout: single
title: Time
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

Gets/sets the internal RTC (Real Time Clock).

## Format

`T` [*`year`* [*`month`* [*`day`* [*`hour`* [*`min`* [*`sec`*]]]]]]

## Parameters

  * *`year`* is full 4 digit year.
  * *`month`* is 1 → 12.
  * *`day`* is 1 → 31 (depending on month).
  * *`hour`* is in 24 hour format (0 → 23).
  * *`min`* is 0 → 59.
  * *`sec`* is 0 → 59.

Providing no parameters returns the current time.

## Response Format

| *`NULL`* | Time set successfully. |
| *`response`* | Current RTC time returned. |

If at least one parameter is given, no response is sent.

*`response`* is of the format: `YYYY/MM/DD«sp»HH/mm/SS`

## Example

Get the current RTC time:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">T</div>
<div class="wrap wrap_response">2016/05/22 13:42:02</div>
</div>

To set the date and time to 2016/05/22 13:00:00:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">T 2016 5 22 13 00 00</div>
<div class="wrap wrap_host_command">T</div>
<div class="wrap wrap_response">2016/05/22 13:00:00</div>
</div>

To change just the date to 2016/05/23:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">T 2016 5 23</div>
<div class="wrap wrap_host_command">T</div>
<div class="wrap wrap_response">2016/05/23 13:00:15</div>
</div>
