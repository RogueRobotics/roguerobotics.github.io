---
layout: single
title: rMP3 Overview
---
{% include base_path %}

  * Supports
    * MMC, SDC, SDHC, SDXC card formats.
      * All available card formats are supported.  From 8MB up to 2TB.
    * FAT12, FAT16 and FAT32.
    * Long file names.
    * SD, miniSD, and microSD form factors.

  * Audio
    * MP3, PCM WAV, IMA ADPCM.
    * MP3 CBR or VBR decoding.
    * 32 to 320 kbps MP3 bitrates.
    * 32, 44.1, and 48 KHz MP3 sample rates.
    * 1/8" Stereo jack for headsets (16+ Ohms) or for line-in connections.
    * 87 dB S/N ratio.

  * Control Interface
    * TTL serial host connection from 2400 → 460800 bps.
    * SPI slave (TBA).
    * 7 bit with trigger interface (control up to 127 sounds).
    * 8 button/switch interface.
      * Configurable polarity, interruption and debounce modes.

  * File System Support
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
      * Files created/modified have time stamps updated to current time.[^a]
    * Configuration on card.
      * Settings can be read from a configuration file on the card.[^b]

  * Bootloader for firmware updates.
  * Chipset available for OEM integration. TQFP or QFN controller + LQFP decoder.
  * -40°C to +85°C operating temperature range.
  * [RoHS](http://en.wikipedia.org/wiki/RoHS){:target="_blank"} compliant.

[^a]: Time must be set after power-up.
[^b]: On power-up only.
