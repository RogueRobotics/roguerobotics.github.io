---
layout: single
title: uMMC Timing Characteristics
---
{% include base_path %}

|Parameter                    |  Min     |  Typ     |  Max     |  Units   |
|:----------------------------|:--------:|:--------:|:--------:|:--------:|
|Serial Speed                 |  2400    |          |  460800  |  bps     |
|Power up delay: no card      |          |          |  200     |  ms      |
|Power up delay: w/card       |  200     |  250     |  400+[^a]  |  ms    |
|Card initialization time[^b] |  30      |  80      |  200+[^a]  |  ms    |


[^a]: Card communication timing will vary widely from brand to brand depending on many factors.
[^b]: This is the amount of time taken to initialize a card after insertion and a command has been sent, but before the command has been executed.
