---
layout: single
title: Update Mode
---
{% include base_path %}

NOTE: These instructions are old and need to be updated.  The procedure for setting the uMMC into update mode is the same, however uploading the firmware has been changed.

If there is a new update to the firmware for the uMMC, it may be downloaded from http://www.roguerobotics.com/.  Once downloaded, it can be sent to the uMMC to update its firmware.  You will need the new firmware and the "update.exe" program.  They will be packaged together in a Zip compressed file.

You will need to connect the uMMC to a PC serial port through a TTL Level converter, or a USB to TTL Level converter.

**THE uMMC WILL BE DAMAGED IF CONNECTED DIRECTLY TO A PC SERIAL PORT!**

To put the uMMC into bootloader mode and download the firmware:

1. Disconnect power to the uMMC, and remove any MMC/SD card from the uMMC.
1. Use a small flat-blade screwdriver to bridge the "UPD" jumper, and continue to hold the screwdriver in place.
   * TIP: you may have more success using other items to short the UPD jumper. Examples are:
     * Paper clip
     * Tips of tweezers
     * Metal tip of a mechanical pencil without lead (thanks Eric!)
1. Connect the power to uMMC. The Activity LED will stay illuminated (on solid) until the update starts.
1. Start the update program from the command line (Start → Run → "cmd.exe" or "command.exe"):

```update umm1-10156.rfw –com1```

* If your serial port is something other than COM1, use:

```update umm1-10156.rfw -com2```

* (replace "com2" with your COM port - maximum is COM8)

The update program will show the progress and you will see the uMMC Activity
LED blink as the firmware is updated.  Once complete, the uMMC will reset and
start normally.

When the uMMC is put into bootloader mode, all settings for the Settings
command are reset to default values (this is so that you can reset the uMMC if an
unknown value is put in any of the settings).  You do not have to download
anything to reset the values.  Just simply put the uMMC into bootloader mode
(explained above), then remove the power to the uMMC. The values will be
reset.
