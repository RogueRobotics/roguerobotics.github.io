---
layout: single
title: uMMC Overview
---
{% include base_path %}

  * Supports
    * MMC, SDC, SDHC, SDXC[^a] card formats.
      * All available card formats are supported.  From 8MB up to 2TB.
    * FAT12, FAT16 and FAT32.
    * Long file names.
    * SD, miniSD, and microSD form factors.

  * TTL serial host connection from 2400 → 460800 bps.
  * Up to 4 file handles open simultaneously for reading and/or writing.
  * Random reads/writes.
    * You can read from or write to anywhere in a file.
    * Seeking in a file allows for file pre-allocation, leading to faster write times.
  * File truncation.
  * Change file modification stamp.
  * Change file attributes.
  * Iterated file listings with wildcards.
    * You can iterate through a directory listing with wildcards.
  * Direct file copy.
    * Copy data from one file to another directly.
  * On-board Real-Time Clock (RTC).
    * Files created/modified have time stamps updated to current time.[^b]
  * Configuration on card.
    * Settings can be read from a configuration file on the card.[^c]
  * Chipset available for OEM integration.  Single TQFP or QFN component.
  * -40°C to +85°C operating temperature range.
  * [RoHS](http://en.wikipedia.org/wiki/RoHS) compliant.

[^a]: SDXC cards must be formatted as FAT32.
[^b]: Time must be set after power-up.
[^c]: On power-up only.
