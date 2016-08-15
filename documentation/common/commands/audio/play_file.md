---
layout: single
title: Play File
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

This plays the file from the given path.

***IMPORTANT:*** The file **MUST** be a valid CBR or VBR MP3, or [RIFF](http://en.wikipedia.org/wiki/RIFF){:target="_blank"} formatted PCM/IMA ADPCM file.
{: .notice--warning}

If you send another **Play File** command while a file is playing, it will stop the current file from playing, then immediately start the new file.

## Format

`PC` `F` *`path`*

## Parameters

  * *`path`* is the absolute path to a file/directory.  A properly formatted path must begin with a "`/`" (forward slash) and begins at the root directory.  Subdirectories are separated with "`/`" (forward slash).
    * e.g. `/logs/january/jan3.log`

## Response Format

| *`NULL`* | Success |
| [`Enn`]({{ base_path }}/documentation/common/error_codes.html) | [An error occurred]({{ base_path }}/documentation/common/error_codes.html) |

## Example

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">PC F /MP3/FIRSTMP3.MP3</div>
</div>
