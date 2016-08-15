---
layout: single
title: Version
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

Returns the current firmware version and serial number.

## Format

`V`

## Parameters

No parameters.

## Response Format

| *`response`* | Version returned |

*`response`* is of the format:
`mmm.nn[-bxxx]«sp»SN:sss...sss`

where:

  * *`mmm`* is the major version code.
  * *`nn`* is the minor version code.
  * *`xxx`* is the beta version code.  This is only returned in the beta versions.
  * *`sss...sss`* is the serial number/code.  Programmed only on request.  Defaults to `UMM1-OEM` for uMMC, `UMP1-OEM` for uMP3 and `RMP3-OEM` for rMP3.

## Example

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">V</div>
<div class="wrap wrap_response">102.08-b003 SN:UMM1-OEM</div>
</div>
