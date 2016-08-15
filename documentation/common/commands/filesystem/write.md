---
layout: single
title: Write
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

You can write up to 512 bytes at a time with the **Write** command.  If *`num`* is omitted, then 512 bytes will be expected.

After the command is received, *`num`* (or 512) bytes are expected to be received.  Data is received raw (i.e. no escape sequences are required).

By default, there is no time-out for how long it takes to send the data.  This means that the uMMC will wait <u>indefinitely</u> for all the data to be sent.

If the value of the **Write Time-out** setting is greater than 0 (zero), then if the time taken between sending bytes exceeds that value (in tens of milliseconds), the **Write** command will terminate, write the accepted bytes to the file, and return to the command prompt.  No error will be returned.

## Format

`W` *`fh`* [*`num`*]

## Parameters

  * *`fh`* is a file handle (1 - 4).  Use the [**Free Handle**](free_handle) command to get a free file handle.
  * *`num`* is the number of bytes to write to the file (1 → 512).  Optional (if not given, 512 is assumed).

## Response Format

| *`NULL`* | Success |
| [`Enn`]({{ base_path }}/documentation/common/error_codes.html) | [An error occurred]({{ base_path }}/documentation/common/error_codes.html) |

## Example

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">I 1</div>
<div class="wrap wrap_response">0/0</div>
<div class="wrap wrap_host_command">W 1 18</div>
<div class="wrap wrap_host_data">13:22:02 ADC1=4.9V</div>
<div class="wrap wrap_host_command">I 1</div>
<div class="wrap wrap_response">18/18</div>
</div>

