---
layout: single
title: uMMC Serial Data Storage Module
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

![uMMC Serial Data Storage Module]({{ base_path }}/images/uMMC-splash.jpg){: width="400px"}

**Current Hardware Version: uMMC-200 (A1)**

|Hardware Version  |  Latest Firmware Version  |
|:-----------------|:--------------------------|
|uMMC-100          |  102.08                   |
|uMMC-200          |  200.01                   |

Below are resources available for the uMMC Serial Data Module.

  * [uMMC Product Page](//www.roguerobotics.com/products/ummc)
  * [uMMC-200-A1 Schematic](ummc-200-a1-schematic.pdf)
  * [Libraries]({{ base_path }}/code/libraries/)
  * [Projects and Examples]({{ base_path }}/code/)
  * [Beta Firmware - See what's new!](beta/)

# Documentation

**INFO:** This documentation is for the latest version of firmware (102.08 or newer).
{: .notice--info }

  * [Features](features.html)
  * [Overview](overview.html)
  * [System Diagram](system_diagram.html)
  * [Interface](interface.html)

# Specifications and Standards

  * [Electrical Characteristics](electrical_characteristics.html)
  * [Timing Characteristics](timing_characteristics.html)
  * [Mechanical Drawing](mechanical_drawing.html)
{% comment %}
  * [Connections](connections.html)
{% endcomment %}

# Communications Protocol

  * [Description]({{ base_path }}/documentation/common/communications_protocol.html#description)
  * [Command Format]({{ base_path }}/documentation/common/communications_protocol.html#command-format)

# Settings

  * **Communication Settings**
    * [Serial Bitrate]({{ base_path }}/documentation/common/settings.html#serial-bitrate)
    * [Prompt Character]({{ base_path }}/documentation/common/settings.html#prompt-character)
    * [Response Delay]({{ base_path }}/documentation/common/settings.html#response-delay)
  * **File System Settings**
    * [Copy Progress Style]({{ base_path }}/documentation/common/settings.html#copy-progress-style)
    * [Read/Write Line Ending]({{ base_path }}/documentation/common/settings.html#readwrite-line-ending)
    * [Write Time-out]({{ base_path }}/documentation/common/settings.html#write-time-out)
    * [Directory Listing Style]({{ base_path }}/documentation/common/settings.html#directory-listing-style)

# Command Set

The Rogue Robotics File System Command Set for the uMMC is also used on the uMP3 and the rMP3.

## General Commands

  * [Settings]({{ base_path }}/documentation/common/commands/settings.html)
  * [Time]({{ base_path }}/documentation/common/commands/time.html)
  * [Version]({{ base_path }}/documentation/common/commands/version.html)

## File Commands

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

# Appendix

  * [Settings Table](settings_table.html)
  * [Error Codes](error_codes.html)
