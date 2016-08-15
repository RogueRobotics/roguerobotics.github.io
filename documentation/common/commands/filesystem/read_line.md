---
layout: single
title: Read Line
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

The **Read Line** command is very similar to the [**Read**](read) command, except that data is returned up to the next EOL terminator.  The "`E`" setting determines the type of EOL terminator that is checked.  The EOL terminator is <u>not</u> returned, only the data up to the EOL.

## Format

`RL` *`fh`* [*`num`* [*`addr`*]]

## Parameters

  * *`fh`* is a file handle (1 - 4).  Use the [**Free Handle**](free_handle) command to get a free file handle.
  * *`num`* is the number of bytes to read.  Optional.  If not specified, up to 512 bytes will be returned.
  * *`addr`* is the address at which to start reading.  Optional.  *`num`* <u>must</u> be given for this parameter to be used.

## Response Format

| `«sp»`*`response`* | Successful (see below) |
| [`Enn`]({{ base_path }}/documentation/common/error_codes.html) | [An error occurred]({{ base_path }}/documentation/common/error_codes.html) |

*`response`* is preceded by a `«sp»`, indicating a good read.  The length of response is variable, and depends on the *`num`* parameter, the position of the file handle, the size of the file, and the location of the next EOL.  Refer to the "`E`" setting.

## Example

File handle position = 0, file size = 38 bytes.  This response differs from what is returned by the [**Read**](read) command:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">RL 1</div>
<div class="wrap wrap_response">«sp»13:22:02 ADC1=4.9V</div>
<div class="wrap wrap_host_command">RL 1</div>
<div class="wrap wrap_response">«sp»13:22:32 ADC1=4.9V</div>
<div class="wrap wrap_host_command">RL 1</div>
<div class="wrap wrap_response">E07</div>
</div>

Same file, read only 18 bytes (starting at address 0):

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">RL 1 18 0</div>
<div class="wrap wrap_response">«sp»13:22:02 ADC1=4.9V</div>
</div>


