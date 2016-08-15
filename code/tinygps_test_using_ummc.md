---
layout: single
title: Tinygps Test Using uMMC
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

Here is a test Arduino sketch to feed sampled GPS data from a uMMC through TinyGPS on a Duemilanove.

It requires the new modified [Satellite Count]({{ base_path }}/code/arduino_tinygps_satellite_count_mod.html) version of TinyGPS.

`TinyGPS_uMMC_Feed_Test.pde`

```cpp
#include <TinyGPS.h>
#include <NewSoftSerial.h>
#include <RogueSD.h>

NewSoftSerial ummc_s(4, 5);

RogueSD ummc(ummc_s);

boolean sendstring(TinyGPS &gps, char *str);
void gpsdump(TinyGPS &gps);

void setup()
{
  int8_t filehandle;
  char linebuf[128];
  int16_t linecount = 0;
  int16_t response;
  TinyGPS test_gps;

  Serial.begin(115200);

  Serial.print("Testing TinyGPS library v. "); Serial.println(TinyGPS::library_version());
  Serial.println();
  Serial.print("Sizeof(TinyGPS_object) = "); Serial.println(sizeof(TinyGPS));
  Serial.print("Sizeof(RogueSD_object) = "); Serial.println(sizeof(RogueSD));
  Serial.println();

  Serial.println("Initializing uMMC");

  // prepares the communications with the uMMC and closes all open files (if any)
  ummc_s.begin(9600);
  ummc.sync();
  
  Serial.print("uMMC Version: ");
  Serial.println(ummc.version());

  // open a file
  Serial.print("Opening gps sample: ");
  filehandle = ummc.open_P(PSTR("/gpssample.gps"), OPEN_READ);

  if(filehandle > 0)
  {
    Serial.print("opened handle ");
    Serial.println(filehandle);
    Serial.println();
//    ummc.seek(filehandle, 21002);  // if you want to seek to a particular point in the file

    while ((response = ummc.readln(filehandle, 127, linebuf)) > 0)
    {
      Serial.print("Test string #"); Serial.println(++linecount, DEC);
      Serial.println("--------------");
      if (sendstring(test_gps, linebuf))
      {
        Serial.println("TinyGPS found a sentence");
        Serial.print("Satellites in view: ");
        Serial.println(test_gps.satsinview(), DEC);
        if (test_gps.fixtype() == TinyGPS::GPS_FIX_NO_FIX)
        {
          Serial.println("No fix.");
        }
        else
        {
          // we have a fix (could be GPS_FIX_2D or GPS_FIX_3D)
          Serial.print("Fix type: ");
          if (test_gps.fixtype() == TinyGPS::GPS_FIX_2D)
            Serial.println("2D");
          else
            Serial.println("3D");

          Serial.print("Satellites used: ");
          Serial.println(test_gps.satsused(), DEC);
          Serial.println();
          gpsdump(test_gps);
        }
      }
      else
        Serial.println("TinyGPS found no usable sentence");

      Serial.println();
      
//      if (linecount == 10)  // if you want to stop after a certain number of lines
//        break;
    }

    if (response < 0)
    {
      if (ummc.LastErrorCode != ERROR_EOF)
      {
        Serial.print("File error: ");
        Serial.println(ummc.LastErrorCode, HEX);
      }
      else
        Serial.println("End of file");
    }

    ummc.close(filehandle);
    Serial.println("File closed.");
  }
  else
  {
    Serial.print("File Open error: ");
    if (ummc.LastErrorCode == ERROR_CARD_NOT_INSERTED)
      Serial.println("No card inserted");
    else
      Serial.println(ummc.LastErrorCode, HEX);
  }
}

void loop()
{
}

void printFloat(double number, int digits=5)
{
  // Handle negative numbers
  if (number < 0.0)
  {
     Serial.print('-');
     number = -number;
  }

  // Round correctly so that print(1.999, 2) prints as "2.00"
  double rounding = 0.5;
  for (uint8_t i=0; i<digits; ++i)
    rounding /= 10.0;
  
  number += rounding;

  // Extract the integer part of the number and print it
  unsigned long int_part = (unsigned long)number;
  double remainder = number - (double)int_part;
  Serial.print(int_part);

  // Print the decimal point, but only if there are digits beyond
  if (digits > 0)
    Serial.print("."); 

  // Extract digits from the remainder one at a time
  while (digits-- > 0)
  {
    remainder *= 10.0;
    int toPrint = int(remainder);
    Serial.print(toPrint);
    remainder -= toPrint; 
  } 
}

boolean sendstring(TinyGPS &gps, char *str)
{
  while (*str)
  {
    Serial.print(*str);
    gps.encode(*str++);
  }
  Serial.println();
  if (gps.encode('\r'))
    return true;
  else
    return false;
}

void gpsdump(TinyGPS &gps)
{
  long lat, lon;
  float flat, flon;
  unsigned long age, date, time, chars;
  int year;
  byte month, day, hour, minute, second, hundredths;
  unsigned short sentences, failed;

  gps.get_position(&lat, &lon, &age);
  Serial.print("Lat/Long(10^-5 deg): "); Serial.print(lat); Serial.print(", "); Serial.print(lon); 
  Serial.print(" Fix age: "); Serial.print(age); Serial.println("ms.");

  gps.f_get_position(&flat, &flon, &age);
  Serial.print("Lat/Long(float): "); printFloat(flat); Serial.print(", "); printFloat(flon);
  Serial.print(" Fix age: "); Serial.print(age); Serial.println("ms.");

  gps.get_datetime(&date, &time, &age);
  Serial.print("Date(ddmmyy): "); Serial.print(date); Serial.print(" Time(hhmmsscc): "); Serial.print(time);
  Serial.print(" Fix age: "); Serial.print(age); Serial.println("ms.");

  gps.crack_datetime(&year, &month, &day, &hour, &minute, &second, &hundredths, &age);
  Serial.print("Date: "); Serial.print(static_cast<int>(month)); Serial.print("/"); Serial.print(static_cast<int>(day)); Serial.print("/"); Serial.print(year);
  Serial.print("  Time: "); Serial.print(static_cast<int>(hour)); Serial.print(":"); Serial.print(static_cast<int>(minute)); Serial.print(":"); Serial.print(static_cast<int>(second)); Serial.print("."); Serial.print(static_cast<int>(hundredths));
  Serial.print("  Fix age: ");  Serial.print(age); Serial.println("ms.");
  
  Serial.print("Alt(cm): "); Serial.print(gps.altitude()); Serial.print(" Course(10^-2 deg): "); Serial.print(gps.course()); Serial.print(" Speed(10^-2 knots): "); Serial.println(gps.speed());
  Serial.print("Alt(float): "); printFloat(gps.f_altitude(), 2); Serial.print(" Course(float): "); printFloat(gps.f_course(), 2); Serial.println();
  Serial.print("Speed (knots): "); printFloat(gps.f_speed_knots(), 2); Serial.print(" (mph): ");  printFloat(gps.f_speed_mph(), 2);
  Serial.print(" (mps): "); printFloat(gps.f_speed_mps(), 2); Serial.print(" (kmph): "); printFloat(gps.f_speed_kmph(), 2); Serial.println();
  gps.stats(&chars, &sentences, &failed);
  Serial.print("Stats: characters: "); Serial.print(chars); Serial.print(" sentences: "); Serial.print(sentences); Serial.print(" failed checksum: "); Serial.println(failed);
}
```

