---
layout: single
title: uMMC Electrical Characteristics
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Absolute Maximum Ratings

|**Operating Temperature**      |  -55°C to +125°C  |
|**Storage Temperature**        |  -65°C to +150°C  |
|**Voltage on any pin**         |  -0.5V to Vcc+0.5V  |
|**Maximum Operating Voltage**  |  6.0V  |

***WARNING:*** Exceeding values beyond these **absolute maximum** values may cause permanent damage to the device and/or card!  Operating at **absolute maximum** rating conditions for extended periods may affect device and/or card reliability.
{: .notice--danger}

## DC Characteristics

|Parameter                   |  Min      |  Typ      |  Max       |  Units  |
|:---------------------------|:---------:|:---------:|:----------:|:-------:|
|Power Supply Current        |           |           |            |         |
|Icc: Idle, Vcc=5V, No card  |           |  11       |  15        |  mA     |
|Icc: Idle, Vcc=3V, No card  |           |  5.5      |  8         |  mA     |
|Icc: Idle, Vcc=5V, w/card   |           |  12       |  40+[^a]   |  mA     |
|Icc: Idle, Vcc=3V, w/card   |           |  6        |  30+[^a]   |  mA     |
|Icc: Active (R/W), Vcc=5V   |           |  25       |  250[^a][^b]  |  mA  |
|Logic Input Low             |  -0.5     |           |  0.2 Vcc[^c]  |  V   |
|Logic Input High            |  0.6 Vcc[^d]  |       |            |  V      |
|Logic Output Low @ Vcc=5V   |           |           |  0.7       |  V      |
|Logic Output Low @ Vcc=3V   |           |           |  0.5       |  V      |
|Logic Output High @ Vcc=5V  |  4.0      |           |            |  V      |
|Logic Output High @ Vcc=3V  |  2.2      |           |            |  V      |

[^a]: Because card active and idle current values vary widely from brand to brand, a maximum cannot be determined.  Please refer to your card manufacturers specifications for read/write current consumption values.
[^b]: This is the maximum current that the on-board LDO regulator will supply.  Cards that require more power than this are not supported.
[^c]: "Max" means the highest value where the pin is guaranteed to be read as low.
[^d]: "Min" means the lowest value where the pin is guaranteed to be read as high.
