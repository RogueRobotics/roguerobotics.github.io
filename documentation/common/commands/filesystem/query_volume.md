---
layout: single
title: Query Volume
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

Returns the free space and the total size of the inserted card.  The two values given are in decimal format and in [kibibytes](http://en.wikipedia.org/wiki/kibibytes){:target="_blank"} (i.e. 1024 bytes per kibibyte).

## Format

`Q` [`A`]

## Parameters

  * `A` displays the file system type as well as the free/total information.

## Response Format

| *`response`* | Successful (see below) |
| [`Enn`]({{ base_path }}/documentation/common/error_codes.html) | [An error occurred]({{ base_path }}/documentation/common/error_codes.html) |

If there are no parameters, *`response`* is of the form:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_response">uu..uuu/tt.ttt</div>
</div>

where:

  * `uu..uuu` is the free space on the card.
  * `tt..ttt` is the total space on the card.

If "`A`" parameter is given, *`response`* is of the form:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_response">FATff«cr»
uu..uuu/tt.ttt</div>
</div>

where:

  * FATff is the file system type (one of FAT12, FAT16 or FAT32).
  * `uu..uuu` is the free space on the card.
  * `tt..ttt` is the total space on the card.

## Example

Example with a card that has 51,245 kibibytes available, from a total of 61,525 kibibytes.

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">Q</div>
<div class="wrap wrap_response">51245/61525</div>
</div>

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">Q A</div>
<div class="wrap wrap_response">FAT12«cr»
51245/61525</div>
</div>
