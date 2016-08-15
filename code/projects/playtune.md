---
layout: single
title: Playtune
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

I was inspired by Brett Hagman's Tone Library (at <http://code.google.com/p/rogue-code/wiki/ToneLibraryDocumentation>) to write a more elaborate polyphonic music generator, which still only uses the square-wave generation of the Arduino processor's timers without volume or timbre control.

"Playtune" will play a musical score with as many simultaneous channels as your processor has timers (2 to 6).  Once a score is started, it plays in the background using interrupt routines, so you can be running any other useful program in the foreground as long as it doesn't use the timers that are playing music.

The score is a sequence of "note on", "note off", and "wait" commands.  You can write scores by hand, but I've also written an ANSI standard C program called "MIDITONES" which will read a MIDI file and create the score commands for any number of channels. 

The source code for both programs are on the Google code project site:

<http://code.google.com/p/arduino-playtune/>

<http://code.google.com/p/miditones/>

The Playtune project has test programs for the Arduino Nano and Mega 2560, which are the only platforms I've tested.

Let me know what you think.  Bug reports and suggestions for improvements are welcome.

-- Len
