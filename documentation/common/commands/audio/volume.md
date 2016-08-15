---
layout: single
title: Volume
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

Gets or sets the playback volume.  The volume values range from 0 to 254 and represent attenuation in steps of -0.5 dB.  For instance, a volume value of 16 is equivalent to -8 dB gain attenuation -- i.e. 16 * -0.5 = -8.

If no value is given, then the current volume is returned.

**INFO:** To set the default start-up volume, use [Settings]({{ base_path }}/documentation/common/commands/settings.html) for non-volatile (start-up) settings.
{: .notice--info}

## Format

`PC` `V` [*`volume`* [*`rightvolume`*]]

## Parameters

  * *`volume`* is a value between 0 and 254.  If this is the only parameter given, then both left and right channels will be set to this value.  Optional.
  * *`rightvolume`* is a value between 0 and 254.  The right channel will be set to this value.  Optional.

## Response Format

| *`NULL`* | Volume set to *`volume`*, and *`rightvolume`*, if present |
| *`response`* | When no parameters are given, then *`response`* is the current volume setting |

*`response`* is in the format *`lll`*`«sp»`*`rrr`*, where:

* *`lll`* is the left volume (up to 3 digits)
* *`rrr`* is the right volume (up to 3 digits)

## Example

To set the volume to 40 (both channels):

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">PC V 40</div>
</div>

To set the left channel volume to 20 and the right channel volume to 254 (volume off):

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">PC V 20 254</div>
</div>

To get the current volume setting:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">PC V</div>
<div class="wrap wrap_response">20 254</div>
</div>
