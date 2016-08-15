---
layout: single
title: uMMC Settings Table
---
{% include base_path %}

|  Setting  |  Name                   |  Value       |  Description (**default**)  |
|:----------|:------------------------|:------------:|:----------------------------|
|D  | Baud/Bit Rate                   | **0**        | **9600 bps** |
|                                    || 1            | 19200 bps |
|                                    || 2            | 38400 bps |
|                                    || 3            | 57600 bps |
|                                    || 4            | 115200 bps |
|                                    || 5            | 2400 bps |
|                                    || 6            | 4800 bps |
|                                    || 7            | 230400 bps |
|                                    || 8            | 460800 bps |
|T  | Write Time-out                  | **0** to 254 | Time in 10 ms increments (e.g. 20 = 200 ms) <br />**0 = No time-out (waits indefinitely)** |
|P  | Prompt Character                | 1 to 254     | **62 ('>')** |
|L  | Directory Listing Style         | **0**        | **old style** |
|                                    || 1            | new style |
|R  | Response Delay                  | **0** to 254 | Time in 10 ms increments (e.g. 5 = 50 ms) <br />**0 = No response delay (immediate response)** |
|C  | Copy Progress Style             | **0**        | **none** |
|                                    || 1            | progress hash "#" every 2048 bytes |
|                                    || 2            | total bytes copied & copy rate |
|                                    || 3            | progress hash, bytes copied & copy rate |
|E  | Read Line/Write Line Terminator | **0**        | **CR** |
|                                    || 1            | LF |
|                                    || 2            | CRLF |
