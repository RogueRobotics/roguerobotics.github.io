---
layout: single
title: Boot Configuration File
---
{% include base_path %}
The uMMC, uMP3 and rMP3 can read a configuration file on boot (power on/hard reset).  Any of their [settings](settings) can be put into the file.

Only the settings in the file are affected.  If a setting is not in the file, it will not change from its current state.  For example, if the baud rate is already set to 19200 bps, it will not change unless you add a baud rate setting change in the settings file.

## Format

The configuration file contains one setting per line.  Lines are terminated with «cr» or «crlf».

## Example

To set the bit rate ("D") to 115200 bps ("4") on a uMMC:
```
D4
```

To set the bit rate ("D") to 2400 bps ("5"), and loop ("O") every file 3 times on an rMP3 or uMP3:
```
D5
O3
```

To set 8 button/switch input mode ("S1"), non-stop playback on all switches ("U255"), with debounce ("M1") on an rMP3 or uMP3:
```
S1
U255
M1
```
