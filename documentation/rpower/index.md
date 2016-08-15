---
layout: single
title: rPower Module
---
{% include base_path %}

The rPower module is used primarily to power uMMC, uMP3, and rMP3 boards in systems which need external power to operate those modules.  It provides a regulated +5VDC output.

The supply power for the rPower module can be from +7.5VDC to +12VDC, often from a wall wart, so a 2.1mm barrel jack is provided.  The barrel plug must have a positive tip.

The only pins on the rPower that are of interest are:

  * **V** = +5V regulated (from 7805 regulator)
  * **G** = Ground

(V and G pins can be found on the two 7 pin side connectors)

  * **+** = 7.5VDC → 12.0VDC positive input from supply
  * **-** = Ground input from supply
