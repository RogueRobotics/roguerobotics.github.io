---
layout: single
title: Info
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

Gives the file position and the file size for the given file handle.

## Format

`I` *`fh`*

## Parameters

  * *`fh`* is a file handle (1 - 4).  Use the [Free Handle](free_handle) command to get a free file handle.

## Response Format

| *`response`* | See below |
| [`Enn`]({{ base_path }}/documentation/common/error_codes.html) | [An error occurred]({{ base_path }}/documentation/common/error_codes.html) |

*`response`* is in the following format:

`pp..ppp/ss..sss`

where:

  * `pp..ppp` is the current byte position in the file
  * `ss..sss` is the file size.

***IMPORTANT:*** `pp..ppp` and `ss..sss` are separated by a forward slash '/'.
{: .notice--warning}

## Example

For a file handle whose byte position is 3250 for a file which is a total of 560700 bytes:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">I 1</div>
<div class="wrap wrap_response">3250/560700</div>
</div>
