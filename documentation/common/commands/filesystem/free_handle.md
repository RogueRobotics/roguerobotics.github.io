---
layout: single
title: Free Handle
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

**Free Handle** returns the next available file handle.

## Format

`F`

## Parameters

None

## Response Format

| *`n`* | *`n`* is the free handle number (1 - 4) |
| [`Enn`]({{ base_path }}/documentation/common/error_codes.html) | [An error occurred]({{ base_path }}/documentation/common/error_codes.html) |

## Example

When no files are open:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">F</div>
<div class="wrap wrap_response">1</div>
</div>


When all files are open:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">F</div>
<div class="wrap wrap_response">E03</div>
</div>
