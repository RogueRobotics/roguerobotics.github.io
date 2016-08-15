---
layout: single
title: File Status
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

Returns the status of the system, or the status of a file handle.

If no parameter is given, the card status is returned.  e.g. If a card is not inserted, `E08` is returned.  If no error, a single `«sp»` is returned.

If a file handle is given, the status of the file handle is returned.  e.g. If the file handle is pointing to the end of the file, `E07` is returned.

## Format

`Z` [*`fh`*]

## Parameters

  * *`fh`* is a file handle (1 - 4).  Use the [**Free Handle**](free_handle) command to get a free file handle.

## Response Format

| *`«sp»`* | Success (file open and not at EOF, or card inserted and successfully initialized.) |
| [`Enn`]({{ base_path }}/documentation/common/error_codes.html) | [An error occurred]({{ base_path }}/documentation/common/error_codes.html) |

## Example

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">Z</div>
<div class="wrap wrap_response">«sp»</div>
</div>

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">Z 2</div>
<div class="wrap wrap_response">E07</div>
</div>
