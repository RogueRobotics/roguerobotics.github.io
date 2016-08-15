---
layout: single
title: rMP3 Beta Firmware
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

Here is where you'll find information on the new firmware releases for the [rMP3 Playback Module]({{ base_path }}/documentation/rmp3/).

## 100.02-b002

### What's new

1. added: `PC Y` command to retrieve spectrum analyzer output (`PC Y P` for peaks, `PC Y S` to set bands).
1. added: `IC T` command to retrieve track length.
1. added: low power mode.
   * Cuts power consumption in half, when idle
   * Expect less than 5 mA
   * RTC still runs, keeping time
   * Mode is activated with setting "Z"
     * `S Z 1` - sets into low power mode.
     * The setting remains active until cleared.
1. fixed: hang on boot (vs10xx init problem).
1. fixed: wildcard handling in listing commands.
1. fixed: 7 bit trigger repeats if held low.
1. fixed: playback speed change - 250% now acceptable, playback time updated.
1. fixed: temp settings not loaded from config file.

### Download

[Rogue Code - rMP3 Beta Downloads - rMP3-100-02-b002](http://code.google.com/p/rogue-code/downloads/list?q=rmp3+beta)

### Update

Use the [Firmware Update Tool]({{ base_path }}/tools/rogueupdater.html) up update the firmware on the rMP3.

### Demonstration

Demo of the spectrum analyzer output:

<iframe width="640" height="360" src="https://www.youtube.com/embed/DH8HDMvpXpU" frameborder="0" allowfullscreen></iframe>
