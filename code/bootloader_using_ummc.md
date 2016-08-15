---
layout: single
title: Bootloader Using uMMC
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

The tricky bit is getting the bootloader to fit into less than 4KB - but it's not that hard if you use the uMMC.  Actually, the bootloader will work with the uMMC, the uMP3 or the rMP3 (MP3 Shield).

The demonstration uses an Arduino Duemilanove and a Rogue Robotics uMMC.  The uMMC is connected to the hardware serial port on the Duemilanove - uMMC "R" to Duemilanove "TX", uMMC "T" to Duemilanove "RX".

The only way to control whether the uMMC is read on reset is through a digital input.  Digital input 4 was arbitrarily chosen - this could be changed in the bootloader code.

When the input is pulled low (i.e. connected to ground), and the Duemilanove is reset, the uMMC is checked if there is a card inserted, and that it contains a file named "sketch.hex".  If so, the file is parsed and SPM'd into the flash memory on the controller.

Once the hex file has been programmed, the bootloader waits until digital input 4 goes high again (i.e. removed from ground), then starts the newly loaded code.

The source code is located here: [RROSC Google Code](http://code.google.com/p/rogue-code/source/browse/Arduino/bootloaders/RogueSDBoot/trunk)

