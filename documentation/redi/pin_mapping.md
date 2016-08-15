---
layout: single
title: rEDI Pin Mapping
---
{% include base_path %}
|  Arduino                       ||  ATmega644P (TQFP44) ||  |
|--------------------------------||----------------------||--|
|  **Pin Number**  |**Function**          |  **Pin Number**  |**Name**  |  **Notes**  |
|--------------|------------------|--------------|------|---------|
|  0   |Digital Pin 0/RX0         |  9   |PD0/RXD0       | Serial  |
|  1   |Digital Pin 1/TX0         |  10  |PD1/TXD0       | Serial  |
|  2   |Digital Pin 2/RX1         |  11  |PD2/RXD1/INT0  | Serial1  |
|  3   |Digital Pin 3/TX1         |  12  |PD3/TXD1/INT1  | Serial1  |
|  4   |Digital Pin 4/PWM         |  13  |PD4/OC1B/XCK1  | Servo 1  |
|  5   |Digital Pin 5/PWM         |  14  |PD5/OC1A       | Servo 2  |
|  6   |Digital Pin 6/PWM         |  15  |PD6/OC2B/ICP   | Servo 3  |
|  7   |Digital Pin 7/PWM         |  16  |PD7/OC2A       | Servo 4  |
|  8   |Digital Pin 8/INT2        |  42  |PB2/INT2/AIN0  | |
|  9   |Digital Pin 9/PWM         |  43  |PB3/OC0A/AIN1  | (optional) LCHB 1EN  |
|  10  |Digital Pin 10/PWM        |  44  |PB4/OC0B/SS    | SPI/(optional) LCHB 2EN  |
|  11  |Digital Pin 11/MOSI       |  1   |PB5/MOSI       | SPI  |
|  12  |Digital Pin 12/MISO       |  2   |PB6/MISO       | SPI  |
|  13  |Digital Pin 13/SCK        |  3   |PB7/SCK        | SPI  |
|  14  |Digital Pin 14/Analog 0   |  37  |PA0/ADC0       | |
|  15  |Digital Pin 15/Analog 1   |  36  |PA1/ADC1       | |
|  16  |Digital Pin 16/Analog 2   |  35  |PA2/ADC2       | |
|  17  |Digital Pin 17/Analog 3   |  34  |PA3/ADC3       | |
|  18  |Digital Pin 18/Analog 4   |  33  |PA4/ADC4       | |
|  19  |Digital Pin 19/Analog 5   |  32  |PA5/ADC5       | |
|  20  |Digital Pin 20/Analog 6   |  31  |PA6/ADC6       | Thumb wheel trim-pot  |
|  21  |Digital Pin 21/Analog 7   |  30  |PA7/ADC7       | Battery/jack voltage monitor  |
|  22  |Digital Pin 22            |  40  |PB0/T0/XCK0    | (optional) LCHB 1DIR  |
|  23  |Digital Pin 23            |  41  |PB1/CLKO/T1    | (optional) LCHB 2DIR  |
|  24  |Digital Pin 24            |  19  |PC0/SCL        | TWI/I2C  |
|  25  |Digital Pin 25            |  20  |PC1/SDA        | TWI/I2C  |
|  26  |Digital Pin 26            |  21  |PC2/TCK        | |
|  27  |Digital Pin 27            |  22  |PC3/TMS        | Piezo speaker  |
|  28  |Digital Pin 28            |  23  |PC4/TDO        | Switch/LED 1 (Green) |
|  29  |Digital Pin 29            |  24  |PC5/TDI        | Switch/LED 2 (Yellow)  |
|  30  |Digital Pin 30            |  25  |PC6            | Switch/LED 3 (Red)  |
|  31  |Digital Pin 31            |  26  |PC7            | Switch/LED 4 (Blue)  |
|  AREF  |Analog Reference        |  29  |AREF           | |
|  RESET  |Reset                  |  4   |RESET          | |
