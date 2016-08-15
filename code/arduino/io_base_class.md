---
layout: single
title: IO Base Class
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

Just a running page with the definition of the IO base class for Arduino.

My original name for the class was SerialComm.  The second iteration was SerialBase.

## Necessities

* Inherit from Print class?
  * more than likely all ABC inheriting classes will require the Print class.
  * it's not necessary, but quite useful.
* Virtual functions (must be implemented by inheriting class):
  * `available()` - is there data available for reading/peeking?
  * `peek()` - peek at first byte in input buffer
    * should we have a block `peek()`?
  * `read()` - read 1 byte from input buffer
    * should we have a block `read()`?
  * `write()` - write 1 byte to output buffer
    * block `write()`?
  * `flush()` - flush data from output buffer?
    * `flush()` for input buffer can be done as follows:<br /><code cpp>while (read() > 0);</code>

## The Class

`UnamedBaseClass.h`

```cpp
/* ???.h

   1. Abstract Base Class for Arduino IO.

  Inherits Print base class to enable print and println functionality.

  Written by Brett Hagman
  bhagman@roguerobotics.com
  http://www.roguerobotics.com/

    This library is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This library is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*************************************************/

#ifndef _xxxBase_h
#define _xxxBase_h

#include <stdint.h>
#include <Print.h>

/*************************************************
* Class Definition
*************************************************/

class xxxBase : public Print
{
  public:
    // available: returns number of bytes available for reading
    // 0 if no bytes
    virtual uint8_t available(void) = 0;

    // peek: returns the byte waiting at the front of the queue
    // -1 if no bytes/error
    virtual int peek(void) = 0;

    // peek (overload): peeks a block of data, if available
    // -1 if no bytes/error, or <= count for the number of bytes peeked
    virtual int peek(char *buf, int count) = 0;

    // read: returns 1 byte if available
    // -1 if no bytes/error
    virtual int read(void) = 0;
    
    // read (overload): reads a block of data, if available
    // -1 if no bytes/error, or <= count for the number of bytes read
    virtual int read(char *buf, int count) = 0;

    // write: sends a single byte
    // NOTE: this is also needed for the Print class
    virtual void write(uint8_t) = 0;

    // write (overload): sends a block of data
    virtual void write(const char *buf, int count) = 0;

    // flush: clears any bytes that may be in the output buffer
    virtual void flush(void) = 0;
};

#endif

```

