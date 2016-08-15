---
layout: single
title: Settings
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

Settings are non-volatile, and are loaded on power up.

When the module is put into [Update Mode]({{ base_path }}/documentation/ummc/update_mode), the default setting values (shown in the settings table for the module) are restored.

Settings can also be set using the [Boot Config File]({{ base_path }}/documentation/common/boot_config).  The settings are read from the file on power-up and replace the current settings.

A description of all of the settings can be found in the Settings section of the module (uMMC, uMP3, rMP3).


## Format

| `S` *`setting`* [*`value`*] | uMMC |
| `ST` *`setting`* [*`value`*] | uMP3 and rMP3 |

## Parameters

  * *`setting`* is the setting to be set/returned.  See the Settings Table for the module.
  * *`value`* is the value to which *`setting`* should be set.  Optional.

## Response Format

| *`NULL`* | Successful |
| *`response`* | If no *`value`* given, this is the current value for the setting. |
| [`Enn`]({{ base_path }}/documentation/common/error_codes.html) | [An error occurred]({{ base_path }}/documentation/common/error_codes.html) |

## Example

To set the bit rate to 2400 bps (on uMMC):

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">S D 5</div>
</div>

To get the current bit rate (on uMP3 or rMP3):

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">ST D</div>
<div class="wrap wrap_response">5</div>
</div>
