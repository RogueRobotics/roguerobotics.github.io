---
layout: single
title: Arduino TinyGPS Satellite Count Mod
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## TinyGPS

A new version is available.

The [TinyGPS Library](http://arduiniana.org/libraries/tinygps/), by Mikal Hart, is a compact GPS library for Arduino.  The only thing I saw missing from the library was a way to find the number of satellites in view, and the number of satellites being used (if a fix has been obtained).

Based on Mikal's version 9 of the TinyGPS Library, I made some modifications to check the GPGSA and GPGSV sentences from the GPS.

## Changes

A small change had to be made to the parsing logic.

Mikal makes the library only parse other GPS sentences when a fix has been obtained ((Technically, Mikal checks the GPRMC sentence to see if the Data Status field is reporting a valid position.)).  To be able to report the data from the GPGSV sentences (satellites in view, among other things), data had to be available even when a fix was not available.

The change means that you can now check the number of satellites that are in view (i.e. `satsinview()`) anytime.

As a result of the changes, another function that you can use to check the current fix type (i.e. no fix, 2D or 3D) is called `fixtype()`.  It returns one of:

* `TinyGPS::GPS_FIX_NO_FIX` (== 1) - No GPS fix.
* `TinyGPS::GPS_FIX_2D` (== 2) - 2D GPS fix.
* `TinyGPS::GPS_FIX_3D` (== 3) - 3D GPS fix. This means altitude data is valid.

(Check [this handy site](http://home.mira.net/~gnb/gps/nmea.html#gpgsa) for details on the GPGSA sentence).

### Example

Here is an example of how you check for valid data and/or check for the satellite count:

`TinyGPS_SatsMod_Example.pde`

```cpp
#include <NewSoftSerial.h>
#include <TinyGPS.h>

TinyGPS gps;
NewSoftSerial nss(2, 3);

void setup()
{
  Serial.begin(115200);
  nss.begin(4800);

  Serial.println("TinyGPS Satellite Count Mod Test");
  Serial.println();
}

void loop()
{
  if (nss.available())
  {
    if (gps.encode(nss.read()))
    {
      Serial.print("Satellites in view: ");
      Serial.println(gps.satsinview(), DEC);

      if (gps.fixtype() == TinyGPS::GPS_FIX_NO_FIX)
      {
        Serial.print("No fix.");
      }
      else
      {
        // we have a fix (could be GPS_FIX_2D or GPS_FIX_3D)
        Serial.print("Fix type: ");
        if (gps.fixtype() == TinyGPS::GPS_FIX_2D)
          Serial.println("2D");
        else
          Serial.println("3D");

        Serial.print("Satellites used: ");
        Serial.println(gps.satsused(), DEC);

        // You can do the rest of your coding here - e.g. gpsdump()
      }
    }
  }
}
```

## Downloads

You can download a zip of the entire modified library from the [Rogue Code Google Code Repository](http://code.google.com/p/rogue-code/downloads/list?q=Tag-ArduinoMods).

Here are the individual source files (I don't intend on creating a code repository for these, since these are modifications to Mikal's Library - so if he wants to include these changes, it's up to him):

### TinyGPS.h

`TinyGPS.h`

```cpp
/*
  TinyGPS - a small GPS library for Arduino providing basic NMEA parsing
  Copyright (C) 2008-9 Mikal Hart
  All rights reserved.

  Satellite Count Mod - by Brett Hagman
  http://www.roguerobotics.com/

  This library is free software; you can redistribute it and/or
  modify it under the terms of the GNU Lesser General Public
  License as published by the Free Software Foundation; either
  version 2.1 of the License, or (at your option) any later version.

  This library is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
  Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public
  License along with this library; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

#ifndef TinyGPS_h
#define TinyGPS_h

#include "WProgram.h"

#define _GPS_VERSION 9 // software version of this library
#define _GPS_MPH_PER_KNOT 1.15077945
#define _GPS_MPS_PER_KNOT 0.51444444
#define _GPS_KMPH_PER_KNOT 1.852
#define _GPS_MILES_PER_METER 0.00062137112
#define _GPS_KM_PER_METER 0.001
//#define _GPS_NO_STATS

class TinyGPS
{
  public:
    TinyGPS();
    bool encode(char c); // process one character received from GPS
    TinyGPS &operator « (char c) {encode(c); return *this;}
    
    // lat/long in hundred thousandths of a degree and age of fix in milliseconds
    inline void get_position(long *latitude, long *longitude, unsigned long *fix_age = 0)
    {
      if (latitude) *latitude = _latitude;
      if (longitude) *longitude = _longitude;
      if (fix_age) *fix_age = _last_position_fix == GPS_INVALID_FIX_TIME ? 
        GPS_INVALID_AGE : millis() - _last_position_fix;
    }

    // date as ddmmyy, time as hhmmsscc, and age in milliseconds
    inline void get_datetime(unsigned long *date, unsigned long *time, unsigned long *fix_age = 0)
    {
      if (date) *date = _date;
      if (time) *time = _time;
      if (fix_age) *fix_age = _last_time_fix == GPS_INVALID_FIX_TIME ? 
        GPS_INVALID_AGE : millis() - _last_time_fix;
    }

    // signed altitude in centimeters (from GPGGA sentence)
    inline long altitude() { return _altitude; }

    // course in last full GPRMC sentence in 100th of a degree
    inline unsigned long course() { return _course; }
    
    // speed in last full GPRMC sentence in 100ths of a knot
    unsigned long speed() { return _speed; }

    // number of satellites in view (GPGSV sentence)
    unsigned char satsinview() { return _satsinview; }

    // number of satellites used for fix (GPGSA sentence)
    unsigned char satsused() { return _satsused; }
    
    // get the fix type
    unsigned char fixtype() { return _fixtype; }

#ifndef _GPS_NO_STATS
    void stats(unsigned long *chars, unsigned short *good_sentences, unsigned short *failed_cs);
#endif

    inline void f_get_position(float *latitude, float *longitude, unsigned long *fix_age = 0)
    {
      long lat, lon;
      get_position(&lat, &lon, fix_age);
      *latitude = lat / 100000.0;
      *longitude = lon / 100000.0;
    }

    inline void crack_datetime(int *year, byte *month, byte *day, 
      byte *hour, byte *minute, byte *second, byte *hundredths = 0, unsigned long *fix_age = 0)
    {
      unsigned long date, time;
      get_datetime(&date, &time, fix_age);
      if (year) 
      {
        *year = date % 100;
        *year += *year > 80 ? 1900 : 2000;
      }
      if (month) *month = (date / 100) % 100;
      if (day) *day = date / 10000;
      if (hour) *hour = time / 1000000;
      if (minute) *minute = (time / 10000) % 100;
      if (second) *second = (time / 100) % 100;
      if (hundredths) *hundredths = time % 100;
    }

    inline float f_altitude()    { return altitude() / 100.0; }
    inline float f_course()      { return course() / 100.0; }
    inline float f_speed_knots() { return speed() / 100.0; }
    inline float f_speed_mph()   { return _GPS_MPH_PER_KNOT * f_speed_knots(); }
    inline float f_speed_mps()   { return _GPS_MPS_PER_KNOT * f_speed_knots(); }
    inline float f_speed_kmph()  { return _GPS_KMPH_PER_KNOT * f_speed_knots(); }

    static int library_version() { return _GPS_VERSION; }

    enum {GPS_INVALID_AGE = 0xFFFFFFFF, GPS_INVALID_ANGLE = 999999999, GPS_INVALID_ALTITUDE = 999999999, GPS_INVALID_DATE = 0,
      GPS_INVALID_TIME = 0xFFFFFFFF, GPS_INVALID_SPEED = 999999999, GPS_INVALID_FIX_TIME = 0xFFFFFFFF};
    
    enum {GPS_FIX_NO_FIX = 1, GPS_FIX_2D = 2, GPS_FIX_3D = 3};

private:
    enum {_GPS_SENTENCE_GPGGA, _GPS_SENTENCE_GPRMC, _GPS_SENTENCE_GPGSV, _GPS_SENTENCE_GPGSA, _GPS_SENTENCE_OTHER};
    
    // properties
    unsigned long _time, _new_time;
    unsigned long _date, _new_date;
    long _latitude, _new_latitude;
    long _longitude, _new_longitude;
    long _altitude, _new_altitude;
    unsigned long  _speed, _new_speed;
    unsigned long  _course, _new_course;
    unsigned char  _satsinview, _new_satsinview;
    unsigned char  _satsused, _new_satsused;
    unsigned char  _fixtype, _new_fixtype;

    unsigned long _last_time_fix, _new_time_fix;
    unsigned long _last_position_fix, _new_position_fix;

    // parsing state variables
    byte _parity;
    bool _is_checksum_term;
    char _term[15];
    byte _sentence_type;
    byte _term_number;
    byte _term_offset;

#ifndef _GPS_NO_STATS
    // statistics
    unsigned long _encoded_characters;
    unsigned short _good_sentences;
    unsigned short _failed_checksum;
    unsigned short _passed_checksum;
#endif

    // internal utilities
    int from_hex(char a);
    unsigned long parse_decimal();
    unsigned long parse_degrees();
    bool term_complete();
    bool gpsisdigit(char c) { return c >= '0' && c <= '9'; }
    long gpsatol(const char *str);
    int gpsstrcmp(const char *str1, const char *str2);
};

// Arduino 0012 workaround
#undef int
#undef char
#undef long
#undef byte
#undef float
#undef abs
#undef round 

#endif
```

### TinyGPS.cpp

`TinyGPS.cpp`

```cpp
/*
  TinyGPS - a small GPS library for Arduino providing basic NMEA parsing
  Copyright (C) 2008-9 Mikal Hart
  All rights reserved.

  Satellite Count Mod - by Brett Hagman
  http://www.roguerobotics.com/

  This library is free software; you can redistribute it and/or
  modify it under the terms of the GNU Lesser General Public
  License as published by the Free Software Foundation; either
  version 2.1 of the License, or (at your option) any later version.

  This library is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
  Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public
  License along with this library; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

#include "WProgram.h"
#include "TinyGPS.h"

#define _GPRMC_TERM   "GPRMC"
#define _GPGGA_TERM   "GPGGA"
#define _GPGSV_TERM   "GPGSV"
#define _GPGSA_TERM   "GPGSA"

TinyGPS::TinyGPS()
:  _time(GPS_INVALID_TIME)
,  _date(GPS_INVALID_DATE)
,  _latitude(GPS_INVALID_ANGLE)
,  _longitude(GPS_INVALID_ANGLE)
,  _altitude(GPS_INVALID_ALTITUDE)
,  _speed(GPS_INVALID_SPEED)
,  _course(GPS_INVALID_ANGLE)
,  _satsinview(0)
,  _satsused(0)
,  _fixtype(GPS_FIX_NO_FIX)
,  _last_time_fix(GPS_INVALID_FIX_TIME)
,  _last_position_fix(GPS_INVALID_FIX_TIME)
,  _parity(0)
,  _is_checksum_term(false)
,  _sentence_type(_GPS_SENTENCE_OTHER)
,  _term_number(0)
,  _term_offset(0)
#ifndef _GPS_NO_STATS
,  _encoded_characters(0)
,  _good_sentences(0)
,  _failed_checksum(0)
#endif
{
  _term[0] = '\0';
}

//
// public methods
//

bool TinyGPS::encode(char c)
{
  bool valid_sentence = false;

  ++_encoded_characters;
  switch(c)
  {
  case ',': // term terminators
    _parity ^= c;
  case '\r':
  case '\n':
  case '*':
    if (_term_offset < sizeof(_term))
    {
      _term[_term_offset] = 0;
      valid_sentence = term_complete();
    }
    ++_term_number;
    _term_offset = 0;
    _is_checksum_term = c == '*';
    return valid_sentence;

  case '$': // sentence begin
    _term_number = _term_offset = 0;
    _parity = 0;
    _sentence_type = _GPS_SENTENCE_OTHER;
    _is_checksum_term = false;
    return valid_sentence;
  }

  // ordinary characters
  if (_term_offset < sizeof(_term) - 1)
    _term[_term_offset++] = c;
  if (!_is_checksum_term)
    _parity ^= c;

  return valid_sentence;
}

#ifndef _GPS_NO_STATS
void TinyGPS::stats(unsigned long *chars, unsigned short *sentences, unsigned short *failed_cs)
{
  if (chars) *chars = _encoded_characters;
  if (sentences) *sentences = _good_sentences;
  if (failed_cs) *failed_cs = _failed_checksum;
}
#endif

//
// internal utilities
//
int TinyGPS::from_hex(char a) 
{
  if (a >= 'A' && a <= 'F')
    return a - 'A' + 10;
  else if (a >= 'a' && a <= 'f')
    return a - 'a' + 10;
  else
    return a - '0';
}

unsigned long TinyGPS::parse_decimal()
{
  char *p = _term;
  bool isneg = *p == '-';
  if (isneg) ++p;
  unsigned long ret = 100UL * gpsatol(p);
  while (gpsisdigit(*p)) ++p;
  if (*p == '.')
  {
    if (gpsisdigit(p[1]))
    {
      ret += 10 * (p[1] - '0');
      if (gpsisdigit(p[2]))
        ret += p[2] - '0';
    }
  }
  return isneg ? -ret : ret;
}

unsigned long TinyGPS::parse_degrees()
{
  char *p;
  unsigned long left = gpsatol(_term);
  unsigned long tenk_minutes = (left % 100UL) * 10000UL;
  for (p=_term; gpsisdigit(*p); ++p);
  if (*p == '.')
  {
    unsigned long mult = 1000;
    while (gpsisdigit(*++p))
    {
      tenk_minutes += mult * (*p - '0');
      mult /= 10;
    }
  }
  return (left / 100) * 100000 + tenk_minutes / 6;
}

// Processes a just-completed term
// Returns true if new sentence has just passed checksum test and is validated
bool TinyGPS::term_complete()
{
  if (_is_checksum_term)
  {
    byte checksum = 16 * from_hex(_term[0]) + from_hex(_term[1]);
    if (checksum == _parity)
    {
#ifndef _GPS_NO_STATS
      ++_good_sentences;
#endif
      _last_time_fix = _new_time_fix;
      _last_position_fix = _new_position_fix;

      switch(_sentence_type)
      {
        case _GPS_SENTENCE_GPRMC:
          _time      = _new_time;
          _date      = _new_date;
          _latitude  = _new_latitude;
          _longitude = _new_longitude;
          _speed     = _new_speed;
          _course    = _new_course;
          break;
        case _GPS_SENTENCE_GPGGA:
          _altitude  = _new_altitude;
          _time      = _new_time;
          _latitude  = _new_latitude;
          _longitude = _new_longitude;
          break;
        case _GPS_SENTENCE_GPGSV:
          _satsinview = _new_satsinview;
          break;
        case _GPS_SENTENCE_GPGSA:
          _satsused = _new_satsused;
          _fixtype = _new_fixtype;
          break;
      }
      return true;
    }

#ifndef _GPS_NO_STATS
    else
      ++_failed_checksum;
#endif
    return false;
  }

  // the first term determines the sentence type
  if (_term_number == 0)
  {
    if (!gpsstrcmp(_term, _GPRMC_TERM))
      _sentence_type = _GPS_SENTENCE_GPRMC;
    else if (!gpsstrcmp(_term, _GPGGA_TERM))
      _sentence_type = _GPS_SENTENCE_GPGGA;
    else if (!gpsstrcmp(_term, _GPGSV_TERM))
    {
      _sentence_type = _GPS_SENTENCE_GPGSV;
    }
    else if (!gpsstrcmp(_term, _GPGSA_TERM))
    {
      _sentence_type = _GPS_SENTENCE_GPGSA;
      _new_satsused = 0;
    }
    else
      _sentence_type = _GPS_SENTENCE_OTHER;
    return false;
  }

  if (_sentence_type == _GPS_SENTENCE_GPGSV)
  {
    if (_term_number == 3 && _term[0])
    {
      // we've got our number of sats
      // NOTE: we will more than likely hit this a few times in a row, because
      // there are usually multiple GPGSV sentences to describe all of the sats
      _new_satsinview = (unsigned char) gpsatol(_term);
    }
  }
  else if (_sentence_type == _GPS_SENTENCE_GPGSA)
  {
    if (_term_number == 2 && _term[0])  // Fix type
    {
      _new_fixtype = (unsigned char) gpsatol(_term);
    }
    else if (_term_number >= 3 && _term_number <= 14 && _term[0]) // Count our sats used
    {
      _new_satsused++;
    }
*    if (_term_number == 15)  * PDOP
*    if (_term_number == 16)  * HDOP
*    if (_term_number == 17)  * VDOP
  }   
  else if (_sentence_type != _GPS_SENTENCE_OTHER && _term[0])
  {
    switch((_sentence_type == _GPS_SENTENCE_GPGGA ? 200 : 100) + _term_number)
    {
      case 101: // Time in both sentences
      case 201:
        _new_time = parse_decimal();
        _new_time_fix = millis();
        break;
      case 103: // Latitude
      case 202:
        _new_latitude = parse_degrees();
        _new_position_fix = millis();
        break;
      case 104: // N/S
      case 203:
        if (_term[0] == 'S')
          _new_latitude = -_new_latitude;
        break;
      case 105: // Longitude
      case 204:
        _new_longitude = parse_degrees();
        break;
      case 106: // E/W
      case 205:
        if (_term[0] == 'W')
          _new_longitude = -_new_longitude;
        break;
      case 107: // Speed (GPRMC)
        _new_speed = parse_decimal();
        break;
      case 108: // Course (GPRMC)
        _new_course = parse_decimal();
        break;
      case 109: // Date (GPRMC)
        _new_date = gpsatol(_term);
        break;
      case 209: // Altitude (GPGGA)
        _new_altitude = parse_decimal();
        break;
    }
  }

  return false;
}

long TinyGPS::gpsatol(const char *str)
{
  long ret = 0;
  while (gpsisdigit(*str))
    ret = 10 * ret + *str++ - '0';
  return ret;
}

int TinyGPS::gpsstrcmp(const char *str1, const char *str2)
{
  while (*str1 && *str1 == *str2)
    ++str1, ++str2;
  return *str1;
}
```

### keywords.txt

`keywords.txt`

```
#######################################
# Syntax Coloring Map for TinyGPS
#######################################

#######################################
# Datatypes (KEYWORD1)
#######################################

TinyGPS	KEYWORD1

#######################################
# Methods and Functions (KEYWORD2)
#######################################

encode	KEYWORD2
get_position	KEYWORD2
get_datetime	KEYWORD2
altitude	KEYWORD2
speed	KEYWORD2
course	KEYWORD2
stats	KEYWORD2
f_get_position	KEYWORD2
crack_datetime	KEYWORD2
f_altitude	KEYWORD2
f_course	KEYWORD2
f_speed_knots	KEYWORD2
f_speed_mph	KEYWORD2
f_speed_mps	KEYWORD2
f_speed_kmph	KEYWORD2
library_version	KEYWORD2
fixtype	KEYWORD2
satsinview	KEYWORD2
satsused	KEYWORD2

#######################################
# Constants (LITERAL1)
#######################################

GPS_INVALID_AGE	LITERAL1
GPS_INVALID_ANGLE	LITERAL1
GPS_INVALID_ALTITUDE	LITERAL1
GPS_INVALID_DATE	LITERAL1
GPS_INVALID_TIME	LITERAL1

GPS_FIX_NO_FIX	LITERAL1
GPS_FIX_2D	LITERAL1
GPS_FIX_3D	LITERAL1
```
