---
layout: single
title: Read
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

You can read up to 512 bytes at a time using the **Read** command.  If the *`num`* parameter is larger than the number of bytes remaining to be read from the file, then only the remaining bytes are returned.  Use the [**Info**](info) command to find the current position.  Data is sent verbatim (i.e. raw data) from the file.

## Format

`R` *`fh`* [*`num`* [*`addr`*]]

## Parameters

  * *`fh`* is a file handle (1 - 4).  Use the [**Free Handle**](free_handle) command to get a free file handle.
  * *`num`* is the number of bytes to read.  Optional.  If not specified, up to 512 bytes will be returned.
  * *`addr`* is the address at which to start reading.  Optional.  *`num`* <u>must</u> be given for this parameter to be used.

## Response Format

| `«sp»`*`response`* | Successful (see below) |
| [`Enn`]({{ base_path }}/documentation/common/error_codes.html) | [An error occurred]({{ base_path }}/documentation/common/error_codes.html) |

*`response`* is preceded by a `«sp»`, indicating a good read.  The length of response is variable, and depends on the *`num`* parameter, the position of the file handle, and the size of the file.

## Example

File handle position = 0, file size = 38 bytes:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">R 1</div>
<div class="wrap wrap_response">«sp»13:22:02 ADC1=4.9V«cr»
13:22:32 ADC1=4.9V«cr»</div>
</div>

A subsequent read:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">R 1</div>
<div class="wrap wrap_response">E07</div>
</div>

Same file, read only 18 bytes (starting at address 0):

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">R 1 18 0</div>
<div class="wrap wrap_response">«sp»13:22:02 ADC1=4.9V</div>
</div>
