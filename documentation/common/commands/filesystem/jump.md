---
layout: single
title: Jump
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

Jumps to any location in a file.  If you use "`E`" as the second parameter, **Jump** will seek to the end of the file.

**NOTE:** If the file is opened for writing, the **Jump** command will automatically extend the file if `addr` specified is larger than the file size.  This is useful for *pre-allocating* a file to reduce delays during writing.
{: .notice--info}

***IMPORTANT:*** If the file is extended, the data beyond the end of the file is *undefined*, so care must be taken to ensure your data is terminated properly.
{: .notice--warning}

You can use this command along with the [Truncate](truncate) command to pre-allocate (for faster writes) then truncate the file.

## Format

`J` *`fh`* *`addr`*\|`E`

## Parameters

  * *`fh`* is a file handle (1 - 4).  Use the [Free Handle](free_handle) command to get a free file handle.
  * *`addr`* is the position to which you want to jump/seek.
  * `E` can be used to jump to the end of the file.

## Response Format

| *`NULL`* | Success |
| [`Enn`]({{ base_path }}/documentation/common/error_codes.html) | [An error occurred]({{ base_path }}/documentation/common/error_codes.html) |

## Example

To jump to byte position 2000 in file handle 1:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">J 1 2000</div>
</div>

To jump to the end of file handle 2:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">J E 2</div>
</div>
