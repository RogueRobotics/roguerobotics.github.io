---
layout: single
title: Card Info
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

Gets card specific information for the inserted card.  If no parameters are given, then the raw byte data for the CSD (16 bytes) and CID (16 bytes) are returned (32 raw bytes total).

If the parameter is "`B`", then the CSD and CID are ASCII encoded - i.e. Two ASCII characters for each raw byte.  e.g. 0x3E is sent as `3E` - two characters.

If the parameter is "`I`", then more data is returned (separated by `«CR»`).

  1. Card type
  1. CSD (16 bytes)
  1. CID (16 bytes)
  1. OCR (4 bytes)

Card type is one of:

| Card type | Description |
|:----------|:------------|
| 1 | MMC (MultiMedia Card) |
| 2 | SD V1 (Secure Digital Card) |
| 4 | SD V2 (Secure Digital Card) |
| 12 | SDHC (Secure Digital - High Capacity Card) |

CSD, CID, and OCR are all sent as ASCII encoded (i.e. Two ASCII characters for each raw byte).

## Format

`K` [`B`\|`I`]

## Parameters

  * `B` - optional parameter to return ASCII encoded CSD and CID.
  * `I` - optional parameter to return more data in ASCII encoded form.

## Response Format

| `«SP»`*`response`* | Success - see examples below for formatting |
| [`Enn`]({{ base_path }}/documentation/common/error_codes.html) | [An error occurred]({{ base_path }}/documentation/common/error_codes.html) |

## Example

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">K</div>
<div class="wrap wrap_response">«SP»*16RAWBYTES*</div>
</div>

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">K B</div>
<div class="wrap wrap_response">«SP»002600321F5983C4FEFACFFF924040C103534453443235365540116A94003C29</div>
</div>

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">K I</div>
<div class="wrap wrap_response">«SP»Card type: 2
CSD:002600321F5983C4FEFACFFF924040C1
CID:03534453443235365540116A94003C29
OCR:80FF8000</div>
</div>
