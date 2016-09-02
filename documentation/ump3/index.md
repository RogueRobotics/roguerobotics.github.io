---
layout: single
title: uMP3 Playback Module
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

![uMP3 Playback Module]({{ base_path }}/images/uMP3-splash.jpg){: width="400px"}

**Current Hardware Version: uMP3-110 (A3)**

|Hardware Version  |  Latest Firmware Version  |
|:-----------------|:--------------------------|
|uMP3-110          |  111.08                   |

Below are some resources for the uMP3 Playback Module.

  * [uMP3 Product Page](http://www.roguerobotics.com/products/ump3)
  * [Libraries]({{ base_path }}/code/libraries.html)
  * [Projects and Examples]({{ base_path }}/code/)
  * [Beta Firmware - See what's new!](beta/)

## Documentation

**INFO:** This documentation is for the latest version of firmware (111.08 or newer).
{: .notice--info}

  * [Features](features.html)
  * [Overview](overview.html)
{% comment %}
  * [System Diagram](system_diagram.html)
  * [Interface](interface.html)
{% endcomment %}

## Specifications and Standards

  * [Electrical Characteristics](electrical_characteristics.html)
  * [Mechanical Drawing](mechanical_drawing.html)
{% comment %}
  * [Timing Characteristics](timing_characteristics.html)
{% endcomment %}

## Connectors

  * [Input Interface](input_interface)

## Communications Protocol

  * [Description]({{ base_path }}/documentation/common/communications_protocol.html#description)
  * [Command Format]({{ base_path }}/documentation/common/communications_protocol.html#command-format)

## Settings

  * **[Communication Settings]({{ base_path }}/documentation/common/settings.html#communication-settings)**
    * [Serial Bitrate]({{ base_path }}/documentation/common/settings.html#serial-bitrate)
    * [Prompt Character]({{ base_path }}/documentation/common/settings.html#prompt-character)
    * [Response Delay]({{ base_path }}/documentation/common/settings.html#response-delay)
  * **[File System Settings]({{ base_path }}/documentation/common/settings.html#file-system-settings)**
    * [Copy Progress Style]({{ base_path }}/documentation/common/settings.html#copy-progress-style)
    * [Read/Write Line Ending]({{ base_path }}/documentation/common/settings.html#readwrite-line-ending)
    * [Write Time-out]({{ base_path }}/documentation/common/settings.html#write-time-out)
    * [Directory Listing Style]({{ base_path }}/documentation/common/settings.html#directory-listing-style)
  * **[Non-volatile Playback Settings]({{ base_path }}/documentation/common/settings.html#non-volatile-playback-settings) (loaded on start-up)**
    * [Volume]({{ base_path }}/documentation/common/settings.html#volume)
    * [Loop Count]({{ base_path }}/documentation/common/settings.html#loop-count)
    * [Boost]({{ base_path }}/documentation/common/settings.html#boost)
  * **[Input/Output Interface Settings]({{ base_path }}/documentation/common/settings.html#inputoutput-interface-settings)**
    * [Input Style]({{ base_path }}/documentation/common/settings.html#input-style)
    * [Hardware Busy Indicator]({{ base_path }}/documentation/common/settings.html#hardware-busy-indicator)
    * [Input File Number Offset]({{ base_path }}/documentation/common/settings.html#input-file-number-offset)
    * [Input Non-stop Control]({{ base_path }}/documentation/common/settings.html#input-non-stop-control)
    * [Input Polarity Control]({{ base_path }}/documentation/common/settings.html#input-polarity-control)
    * [Switch Input Debounce Mode]({{ base_path }}/documentation/common/settings.html#switch-input-debounce-mode)

## Command Set

### General Commands

  * [Settings]({{ base_path }}/documentation/common/commands/settings.html)
  * [Time]({{ base_path }}/documentation/common/commands/time.html)
  * [Version]({{ base_path }}/documentation/common/commands/version.html)

### Playback Commands

  * [Play File]({{ base_path }}/documentation/common/commands/audio/play_file.html)
  * [Play Next]({{ base_path }}/documentation/common/commands/audio/play_next.html)
  * [Jump (FF/REW)]({{ base_path }}/documentation/common/commands/audio/jump.html)
  * [Stop]({{ base_path }}/documentation/common/commands/audio/stop.html)
  * [Pause]({{ base_path }}/documentation/common/commands/audio/pause.html)
  * [Playback Status]({{ base_path }}/documentation/common/commands/audio/playback_status.html)
  * [Playback Information]({{ base_path }}/documentation/common/commands/audio/playback_information.html)
  * [Play Tone]({{ base_path }}/documentation/common/commands/audio/play_tone.html)
  * [Playback Speed Change]({{ base_path }}/documentation/common/commands/audio/playback_speed_change.html)
  * [Reset Audio]({{ base_path }}/documentation/common/commands/audio/reset_audio.html)
  * [Volume]({{ base_path }}/documentation/common/commands/audio/volume.html)
  * [Loop Count]({{ base_path }}/documentation/common/commands/audio/loop_count.html)
  * [Audio Boost]({{ base_path }}/documentation/common/commands/audio/boost.html)

### File System Commands

**INFO:** All File System Commands are identical to the file commands available on the uMMC and rMP3. Be sure to prefix each command with "`FC`".
{: .notice--info}

  * [Set Attributes]({{ base_path }}/documentation/common/commands/filesystem/set_attributes.html)
  * [Copy]({{ base_path }}/documentation/common/commands/filesystem/copy.html)
  * [Close]({{ base_path }}/documentation/common/commands/filesystem/close.html)
  * [Change Timestamp]({{ base_path }}/documentation/common/commands/filesystem/change_timestamp.html)
  * [Erase File]({{ base_path }}/documentation/common/commands/filesystem/erase_file.html)
  * [Free Handle]({{ base_path }}/documentation/common/commands/filesystem/free_handle.html)
  * [Info]({{ base_path }}/documentation/common/commands/filesystem/info.html)
  * [Jump]({{ base_path }}/documentation/common/commands/filesystem/jump.html)
  * [Card Info]({{ base_path }}/documentation/common/commands/filesystem/card_info.html)
  * [List Directory]({{ base_path }}/documentation/common/commands/filesystem/list_directory.html)
  * [Make Directory]({{ base_path }}/documentation/common/commands/filesystem/make_directory.html)
  * [Rename]({{ base_path }}/documentation/common/commands/filesystem/rename.html)
  * [Open]({{ base_path }}/documentation/common/commands/filesystem/open.html)
  * [Query Volume/Card]({{ base_path }}/documentation/common/commands/filesystem/query_volume.html)
  * [Read]({{ base_path }}/documentation/common/commands/filesystem/read.html)
  * [Read Line]({{ base_path }}/documentation/common/commands/filesystem/read_line.html)
  * [Truncate]({{ base_path }}/documentation/common/commands/filesystem/truncate.html)
  * [Write]({{ base_path }}/documentation/common/commands/filesystem/write.html)
  * [Write Line]({{ base_path }}/documentation/common/commands/filesystem/write_line.html)
  * [File Status]({{ base_path }}/documentation/common/commands/filesystem/file_status.html)

## Appendix

  * [Settings Table](settings_table.html)
  * [Error Codes]({{ base_path }}/documentation/common/error_codes.html)
