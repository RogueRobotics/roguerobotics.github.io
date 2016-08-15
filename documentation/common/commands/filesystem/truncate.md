---
layout: single
title: Truncate
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

Truncates the file at the current position.

***WARNING:*** This will effectively delete all data after the current position in the file.  Use with care.
{: .notice--danger}

## Format

`U` *`fh`*

## Parameters

  * *`fh`* is a file handle (1 - 4).  Use the [**Free Handle**](free_handle) command to get a free file handle.

## Response Format

| *`NULL`* | Success |
| [`Enn`]({{ base_path }}/documentation/common/error_codes.html) | [An error occurred]({{ base_path }}/documentation/common/error_codes.html) |

## Example

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">I 1</div>
<div class="wrap wrap_response">1200/5000</div>
<div class="wrap wrap_host_command">U 1</div>
<div class="wrap wrap_host_command">I 1</div>
<div class="wrap wrap_response">1200/1200</div>
</div>
