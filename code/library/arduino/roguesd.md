---
layout: single
title: RogueSD Arduino Library
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Rogue Robotics SD Card Module Interface Library Usage

**DOWNLOAD:** <http://code.google.com/p/rogue-code/downloads/list?q=library+roguesd>

----

This Library has been provided to ease the communications with the [Rogue Robotics](http://www.roguerobotics.com/) SD Card Modules:

  * [uMMC Serial Data Module](http://www.roguerobotics.com/products/ummc)
  * [uMP3 Playback Module](http://www.roguerobotics.com/products/ump3)
  * [rMP3 Playback Module](http://www.roguerobotics.com/products/rmp3)

The SD Card modules can communicate through standard TTL serial at speeds from 2400 bps up to 460800 bps.  [SD](http://en.wikipedia.org/wiki/Secure_Digital_card){:target="_blank"} or [SDHC](http://en.wikipedia.org/wiki/Secure_Digital_card#SDHC){:target="_blank"} cards are accepted and can be formatted in [FAT12](http://en.wikipedia.org/wiki/File_Allocation_Table#FAT12){:target="_blank"}, [FAT16](http://en.wikipedia.org/wiki/File_Allocation_Table#Initial_FAT16){:target="_blank"} or [FAT32](http://en.wikipedia.org/wiki/File_Allocation_Table#FAT32){:target="_blank"}.  [MicroSD](http://en.wikipedia.org/wiki/MicroSD){:target="_blank"} and [MiniSD](http://en.wikipedia.org/wiki/MiniSD){:target="_blank"} cards can be used with an appropriate adapter.

Data can be stored on or retrieved from cards using a card reader on a computer.

## uMMC, uMP3 firmware

The library will work with earlier versions of firmware for the uMMC and uMP3 (101.56, 110.12 respectively), but performance will be better with later firmware.  Information on updating module firmware can be found here:

* [Updating Rogue Module Firmware]({{ base_path }}/faq.html#how-do-i-update-the-firmware-on-the-rmp3)

## Instantiation

```cpp
// Example for connecting to a Rogue Robotics uMMC.
// Arduino pin 4 is connected to the uMMC's "T" pin
//         pin 5 is connected to the uMMC's "R" pin
#include <NewSoftSerial.h>
#include <RogueSD.h>

NewSoftSerial ummc1_s(4, 5);

RogueSD filecommands(ummc_s);

void setup()
{
  ummc1_s.begin(9600);
  
  filecommands.sync();
}
```

## Datatypes/Structures

### fileinfo

A `struct` which contains file information.

```cpp
struct fileinfo {
                  uint32_t position;
                  uint32_t size;
                };
```

* `position` is the current position in the file.
* `size` is the size (in bytes) of the file.

### open_mode

An enumeration type specifying the open mode.

```cpp
enum open_mode {
                 OPEN_READ = 1,
                 OPEN_WRITE = 2,
                 OPEN_RW = 3,
                 OPEN_APPEND = 4
               };
```

## Properties

### LastErrorCode

If an error occurred in a previous method, this will contain the most recent error code.

* [Table of error codes]({{ base_path }}/documentation/common/error_codes.html)
* Example: `Serial.println(filecommands.LastErrorCode, HEX);`

## Methods

### close

`close(in handle)` - closes a file.

#### Example

```cpp
filecommands.close(filehandle);
```

### closeall

`closeall()` - closes all open files.

#### Example

```cpp
filecommands.closeall();
```

### changesetting

`int changesetting(char setting, unsigned int value)` - changes a setting.

  * returns 0 if successful, -1 on error.
  * see [Settings Table]({{ base_path }}/documentation/ummc/settings_table.html) for more information.

#### Example

```cpp
filecommands.changesetting('L', 1);
```

### getsetting

`int getsetting(char setting)` - gets the value of a setting.
  * returns the setting value if successful (> 0), or -1 on error.

#### Example

```cpp
int listingType = filecommands.getsetting('L');
```


### entrytofilename

`int8_t entrytofilename(char *filename, uint8_t count, const char *filemask, uint16_t entrynum)` - gets the filename at `entrynum`.

* returns the filename (max string length of `count`), from path and filter `filemask`, of `entrynum`.
* returns -1 on error.

#### Example

Get the 22<sup>nd</sup> entry of the file listing from `/MP3/*.mp3`:

```cpp
char filename[128];

filecommands.entrytofilename(filename, 128, "/MP3/*.mp3", 22);
```


### filecount

`int32_t filecount(char *filemask)` - returns the number of files matching `filemask`.  `filemask` can contain a path.  e.g. "/audio/*.mp3"

* returns the number of files matching if successful, -1 on error.

**NOTE:** In the Arduino IDE, if you use the comment start "/*" characters without a closing "*/", the IDE will produce an error due to comment checking.  To avoid this error, use "/""*".
{: .notice--info}

#### Example

```cpp
int32_t numberOfMP3s = filecommands.filecount("/audio/*.mp3");
```

```cpp
/* Example to show how to get around IDE error */
int32_t numberOfLogs = filecommands.filecount("/logs/""*.log");
```

### getfileinfo

`fileinfo getfileinfo(int handle)` - gets the file information of an open file.

#### Example

```cpp
fileinfo fi = filecommands.getfileinfo(filehandle);

unsigned long remainingbytes = fi.size - fi.position;
```

### getfreehandle

`int getfreehandle()` - requests a free handle (1 - 4).

* returns 0 if no handles available, -1 on error, or 1 → 4 for the first free handle.

#### Example

```cpp
  int filehandle = getfreehandle();
```

### getmoduletype

`byte getmoduletype()` - returns the module type (uMMC = 1, uMP3 = 2, rMP3 = 3).

### gettime

`gettime(int rtc[])` - gets the module's current RTC time.

* `rtc` is an array of int's:
  * year (full - e.g. 2010)
  * month (1 → 12)
  * day (1 → 31)
  * hour (0 → 23)
  * minute (0 → 59)
  * second (0 → 59)

#### Example

```cpp
int rtctime[6];

filecommands.gettime(rtctime);
```

### settime

`settime(int rtc[])` - sets the module's RTC time.

  * `rtc` is an array of int's:
    * year (full - e.g. 2010)
    * month (1 → 12)
    * day (1 → 31)
    * hour (0 → 23)
    * minute (0 → 59)
    * second (0 → 59)

#### Example

```cpp
int rtctime[] = { 2010, 4, 28, 17, 30, 0 };

filecommands.settime(rtctime);
```

```cpp
int rtctime[6];

rtctime[0] = 2010;
rtctime[1] = 4;
rtctime[2] = 28;
rtctime[3] = 17;
rtctime[4] = 30;
rtctime[5] = 0;

filecommands.settime(rtctime);
```

### open

`int open(*various*)` - opens a file.

* returns file handle (> 0) on success, -1 on error.
* `open(const char *filename)`
  * opens `filename` in read-only mode.
* `open(const char *filename, open_mode mode)`
  * opens `filename` in mode given by `mode`.
* `open(int8_t handle, const char *filename)`
  * opens `filename` on file handle `handle`, in read-only mode.
* `open(int8_t handle, const char *filename, open_mode mode)`
  * opens `filename` on file handle `handle`, in mode given by `mode`.

`int open_P(*various*)` - opens a file, using a PROGMEM string for the filename.

* returns file handle (> 0) on success, -1 on error.
* `open_P(const prog_char *filename)`
  * opens `filename` in read-only mode.
* `open_P(const prog_char *filename, open_mode mode)`
  * opens `filename` in mode given by `mode`.
* `open_P(int8_t handle, const prog_char *filename)`
  * opens `filename` on file handle `handle`, in read-only mode.
* `open_P(int8_t handle, const prog_char *filename, open_mode mode)`
  * opens `filename` on file handle `handle`, in mode given by `mode`.

#### Example

```cpp
int filehandle = filecommands.open("/scripts/script01.txt");
```

```cpp
int filehandle = filecommands.open_P(PSTR("/logs/daily/20100428.csv"), OPEN_RW);
```

### opendir

`opendir(char *folder)` - prepares a folder for iterative listing.

#### Example

```cpp
filecommands.opendir("/audio");
```

### readdir

`int readdir(char filename, char filemask)` - gets the next filename matching `filemask`.

  * returns 0 if successful, -1 on EOF (i.e. no more matches), -2 on error.

#### Example

```cpp
char filename[128];

filecommands.opendir("/audio");

while(filecommands.readdir(filename, "*.mp3")
{
  Serial.println(filename);
}
```


### readbyte

`int readbyte(int handle)` - reads a single byte/character from an open file.
  * returns -2 on error, -1 if no data, or the character read (0 → 255).

#### Example

```cpp
  int c = filecommands.readbyte(filehandle);
  if (c > 0)
  {
    Serial.print(c);
  }
  else
  {
    Serial.print("Error Code: ");
    Serial.println(filecommands.LastErrorCode, HEX);
  }
```

### read

`int read(int handle, unsigned int count, char *buffer)` - reads data from an open file.

* returns -2 on error, -1 if EOF (end of file), 0 for no bytes read, or > 0 for the number of bytes actually read.
* `count` is the number of bytes you would like to read.
* `buffer` is an array of char's for storing the data.

#### Example

```cpp
char mybuffer[40];

int response = filecommands.read(filehandle, 40, mybuffer);
```

### readln

`int readln(int handle, unsigned int maxlength, char *buffer)` - reads a line of data from an open file (terminated by a CR/LF).  The CR/LF is NOT included in the data returned.  The string is terminated by a NUL (`\0`).

* returns -2 on error, -1 on EOF (end of file), 0 for no bytes read, or > 0 for the number of bytes actually read.
* `maxlength` is the maximum number of bytes to read.
  * this is the number of bytes that will be read, ***including*** the NUL terminator.
* `buffer` is an array of char's for storing the data.

#### Example

```cpp
char mybuffer[40];

int response = filecommands.readln(filehandle, 40, mybuffer);
```

### seek

`int seek(int handle, unsigned long newposition)` - seeks to the given position in an open file.

  * returns 0 if successful, -1 on error.
  * `newposition` is the absolute position to seek to.
    * NOTE: to seek to a relative position in the file, use the `getfileinfo()` command to get the current position in the file, and add/subtract from that value.

#### Example

```cpp
int response = filecommands.seek(filehandle, newposition);
```
```cpp
fileinfo fi = filecommands.getfileinfo(filehandle);

int response = filecommands.seek(filehandle, fi.position + 20);
```

### seektoend

`int seektoend(int handle)` - seeks to the end of an open file.  You use this if you want to append to a file open for reading and writing (`OPEN_RW`).

  * returns 0 if successful, -1 on error.

#### Example

```cpp
int response = filecommands.seektoend(filehandle);
```

### status

`int status(int handle)` - gets the current status of the card or filehandle.

* returns 0 on success, -1 on error.
* if `handle` is not given, the card status is returned.
* if `handle` is given, then the status of that handle is returned.
  * `status()` returns -1 if the file is at EOF (End of File).  Use [#LastErrorCode] if -1 is returned.

#### Example

```cpp
  if (filecommands.status() < 0)
    if (filecommands.LastErrorCode == ERROR_CARD_NOT_INSERTED)
      Serial.println("Please insert card");
```

```cpp
  if (filecommands.status(filehandle) < 0)
    if (filecommands.LastErrorCode == ERROR_EOF)
      Serial.println("No more data");
```

### sync

`int sync()` - synchronizes communications with the module - and closes all open files.

* returns 0 on success, -1 on error.

#### Example

```cpp
  filecommands.sync();
```

### version

`int version()` - gets the version of the module firmware.

* returns the version number (e.g. Version 102.08 = `10208`)

### write

`int write(int handle, unsigned int count, char *data)` - writes data to an open file.

* returns 0 if successful, -1 on error.
* `count` is the number of bytes in data that will be written to the file.
* `data` is the data to be written.

#### Example

```cpp
  char *sDate = "Date: ";

  int response = filecommands.write(filehandle, strlen(sDate), sDate);
```

```cpp
  int response = filecommands.write(filehandle, 4, "DONE");
```

### writeln

`int writeln(int handle, char *data)` - writes a line of data to an open file (CR is added after the line).  You can change the terminator (CR, CR+LF, LF) using `changesetting('E', ...)`.  See [Settings Table]({{ base_path }}/documentation/ummc/settings_table.html) for more information.

* `data` is the data to be written to the file. NOTE: data does not have to end with a CR/LF - but it **MUST** be NUL terminated.

#### Example

```cpp
int response = filecommands.writeln(filehandle, "---DATA---");
```

### writeln_prep

`writeln_prep(int handle)` - prepares the module for a line of data to be written to an open file.

Within the `writeln_prep()` and `writeln_finish()` block, you can also use all of the familiar Print class methods to send data to the module.

e.g.

```cpp
filecommands.writeln_prep(filehandle);
filecommands.print("Value 1: ");
filecommands.print(value1, DEC);
filecommands.writeln_finish();
```

NOTE: Do not use the `println()` methods, as these will cause the library to get out of sync.

**NOTE:** If you use the `writeln_prep()` command with uMMC firmware < 102.00, or uMP3 firmware < 111.00, you MUST ensure that any `print()` commands follow IMMEDIATELY after the `writeln_prep()` command.
{: .notice--info}

### writeln_finish

`int writeln_finish()` - completes the writeln after data has been sent.

  * returns 0 if successful, -1 on error.

## Constants

Here's a list of constants available.

```cpp
#define DEFAULT_PROMPT                        0x3E

#define ERROR_BUFFER_OVERRUN                  0x02
#define ERROR_NO_FREE_FILES                   0x03
#define ERROR_UNRECOGNIZED_COMMAND            0x04
#define ERROR_CARD_INITIALIZATION_ERROR       0x05
#define ERROR_FORMATTING_ERROR                0x06
#define ERROR_EOF                             0x07
#define ERROR_CARD_NOT_INSERTED               0x08
#define ERROR_MMC_RESET_FAIL                  0x09
#define ERROR_CARD_WRITE_PROTECTED            0x0a
#define ERROR_INVALID_HANDLE                  0xf6
#define ERROR_OPEN_PATH_INVALID               0xf5
#define ERROR_FILE_ALREADY_EXISTS             0xf4
#define ERROR_DE_CREATION_FAILURE             0xf3
#define ERROR_FILE_DOES_NOT_EXIST             0xf2
#define ERROR_OPEN_HANDLE_IN_USE              0xf1
#define ERROR_OPEN_NO_FREE_HANDLES            0xf0
#define ERROR_FAT_FAILURE                     0xef
#define ERROR_SEEK_NOT_OPEN                   0xee
#define ERROR_OPEN_MODE_INVALID               0xed
#define ERROR_READ_IMPROPER_MODE              0xec
#define ERROR_FILE_NOT_OPEN                   0xeb
#define ERROR_NO_FREE_SPACE                   0xea
#define ERROR_WRITE_IMPROPER_MODE             0xe9
#define ERROR_WRITE_FAILURE                   0xe8
#define ERROR_NOT_A_FILE                      0xe7
#define ERROR_OPEN_READONLY_FILE              0xe6
#define ERROR_NOT_A_DIR                       0xe5

#define ERROR_NOT_SUPPORTED                   0xff
```
