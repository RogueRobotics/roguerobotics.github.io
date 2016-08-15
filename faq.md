---
layout: single
title: FAQ
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## What are the differences between the uMP3 and the rMP3?

The [uMP3]({{ base_path }}/documentation/ump3/) has been around since 2003 and is tried, tested and true.  It's original design was intended for OEM integration.  It uses the ATmega32 controller running at 7.3728 MHz.

The uMP3 can operate on a supply voltage as low as 3.0V.

The [rMP3]({{ base_path }}/documentation/rmp3/) can also be used for OEM integration, but is also an Arduino(tm) compatible shield.  The controller (ATmega644P) is running at 2.5x the speed of the uMP3, enabling more processing in the same amount of time.  The larger flash size on the controller also provides more space for firmware improvements, which you will see quite soon.

The rMP3 can operate on a supply voltage as low as 4.2V.

They both have the same base function set (playback controls, external triggering, upgradeable firmware, config on card (COC), file access, etc).  You will see more improvements on the rMP3 versus the uMP3 because of the flash constraints.

The reason for the price discrepancy between the uMP3 and the rMP3 is because of production volumes.
The uMP3 has been manufactured in small quantities, and as such has higher overhead.  Whereas the rMP3 has been produced in much larger quantities and we can pass the savings to our customers.

The uMP3 is nearing its end of life.  We won't be developing new firmware for the uMP3.  We don't intend on discontinuing the manufacturing of the uMP3, but we do recommend that new designs use the rMP3.  If we do discontinue manufacturing of any of our products, we will give our customers plenty of time to make changes.

## How do I update the firmware on the rMP3?

Here is one way to do it:

  1. Disconnect everything from the rMP3.
  1. Short pins 2 & 3 on JP6.
  1. Solder a 6 pin male header into JP3.
     * [rMP3 FTDI Cable connector]({{ base_path }}/documentation/rmp3/connectors.html#ftdi-cable-connector)
  1. Short JP5 (power directly from the FTDI connector).
  1. Connect FTDI Basic Breakout to JP3 (make sure you get the proper orientation - i.e. GND to GND).
  1. Plug the FTDI Basic Breakout USB cable into your computer.  The rMP3 should have the blue LED lit.
  1. Start the [RogueUpdater]({{ base_path }}/tools/rogueupdater.html) app (RogueUpdater.jar).  Select the rMP3 firmware you want to upload, and select the COM port that the rMP3 is connected to, and click "Upload".

After that, the blue LED should blink, and the progress bar should move along as the firmware is uploaded.  Once uploaded (100% on progress bar), the rMP3 will restart, but since you have 2 & 3 shorted on JP6, the blue LED will still be lit.  You will need to remove the short and restart the rMP3 to test.

## Why is the volume low on my studio headphones?

Studio headphones are usually high impedance headphones, with impedances in the range of 150 to 600 and more Ohms.

From the [Harman AKG](http://www.akg.com/) site:

----

> So-called low impedance headphones may vary from 75 ohms up to about 150 ohms. Phones in this impedance range may be directly plugged into the headphone jack routinely found on recording and playback equipment. Higher impedances, such as 600 ohms, are more useful in studio installations where many units may be wired in parallel for studio monitoring applications.
>
>Headphone sensitivity is usually stated as the in-the-ear sound pressure level produced by one milliwatt (mW) of audio input. Typical sensitivity ratings of AKG headphones run from 88 dB per mW to 105 dB per mW. You can see that very little power is needed to drive a stereo headphone pair to very high listening levels."
>
>Low impedance headphones will sound louder with devices with low output voltages such as portable MD recorders etc., you cannot use more than one pair of headphones at the same output simultaneously."

----
