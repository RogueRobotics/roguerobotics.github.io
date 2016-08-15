---
layout: single
title: Web Server Using RogueSD
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

Here is an example of a web server running on an Arduino board.  The rig consists of a Arduino Duemilanove (2009), with an Arduino Ethernet Shield, and a Rogue Robotics uMMC Serial Data Module running at 38400 bps connected to pins 14 and 15 on the Arduino.

There are a few modifications to the Ethernet library and to the webduino library.  I'll post the updates to the libraries if people are interested enough.  Make some comments below.

## Demo Site

***(no longer available)***

The demo site has a chat page example, and an authentication example.  The user and password for the authentication example is "kotter" and "sweathog" respectively.

Web Demo 1

## Shield Stack

![uMMC Web Server Stack]({{ base_path }}/code/images/ummc-web-server-stack.jpg)

The Arduino shield stack is: Arduino 2009, Arduino Ethernet Shield, and Rogue Robotics uMMC.

## Source Code

`RogueSD_Web_Server1.pde`

```cpp

#define WEBDUINO_SERIAL_DEBUGGING 0
#define WEBDUINO_USE_AUTHENTICATION 1

#include <avr/pgmspace.h>
#include <ctype.h>
#include "Ethernet.h"
#include "WebServer.h"
#include <RogueSD.h>
#include <NewSoftSerial.h>

NewSoftSerial ummc_s(14, 15);

RogueSD ummc1(ummc_s);

// CHANGE THIS TO YOUR OWN UNIQUE VALUE
static uint8_t mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
static uint8_t ip[] = { 192, 168, 1, 102 };

WebServer webserver("", 80);

int32_t getFileSize(const char *path)
{
  int8_t filehandle;
  uint32_t filesize = -1;

  filehandle = ummc1.open(path, OPEN_READ);
  
  if(filehandle > 0)
  {
    fileinfo fi = ummc1.getfileinfo(filehandle);
    filesize = fi.size;
    ummc1.close(filehandle);
  }

  return filesize;
}

int8_t spewFile(WebServer &server, const char *path)
{
  int8_t resp, filehandle;
  char buffer[50];

  filehandle = ummc1.open(path, OPEN_READ);
    
  if(filehandle > 0)
  {
    while((resp = ummc1.read(filehandle, 50, buffer)) > 0)
    {
      server.write(buffer, resp);
    }
    ummc1.close(filehandle);
    
    return 0;
  }
  else
  {
    return -1;
  }
}


void displayRequest(WebServer &server, WebServer::ConnectionType type, char *url_tail)
{
  char ipaddr[20];
  uint8_t rip[4];

  server.getRemoteIP(rip);
  sprintf_P(ipaddr, PSTR("%u.%u.%u.%u "), rip[0], rip[1], rip[2], rip[3]);
  Serial.print(ipaddr);
  switch(type)
  {
    case WebServer::HEAD:
      Serial.print("HEAD");
      break;
    case WebServer::GET:
      Serial.print("GET");
      break;
    case WebServer::POST:
      Serial.print("POST");
      break;
    default:
      Serial.print("UNKNOWN");
      break;
  }
  Serial.print(" /");
  Serial.print(url_tail);
  Serial.print(' ');
}

void fileCmd(WebServer &server, WebServer::ConnectionType type, char *url_tail, bool tail_complete)
{
  int8_t filehandle;
  char buffer[50];
  char *mimetype;
  char extraheader[30];
  int32_t filesize;

displayRequest(server, type, url_tail);

  /* we don't output the body for a HEAD request */
  if(strcasecmp_P(url_tail+strlen(url_tail)-3, PSTR("jpg")) == 0)
  {
    mimetype = "image/jpeg";
  }
  else if(strcasecmp_P(url_tail+strlen(url_tail)-3, PSTR("png")) == 0)
  {
    mimetype = "image/png";
  }
  else if(strcasecmp_P(url_tail+strlen(url_tail)-3, PSTR("gif")) == 0)
  {
    mimetype = "image/gif";
  }
  else if(strcasecmp_P(url_tail+strlen(url_tail)-3, PSTR("htm")) == 0 || strcasecmp_P(url_tail+strlen(url_tail)-4, PSTR("html")) == 0)
  {
    mimetype = "text/html";
  }
  else
  {
    mimetype = "text/plain";
  }

  strcpy_P(buffer, PSTR("/w/"));
  strcat(buffer, url_tail);

  filesize = getFileSize(buffer);

  if(filesize >= 0)
  {
    sprintf_P(extraheader, PSTR("Content-Length: %lu\r\n"), filesize);

Serial.print("200 ");
Serial.print(filesize);

    server.httpSuccess(mimetype, extraheader);

    if(type != WebServer::HEAD)
    {
      if(spewFile(server, buffer) != 0)
      {
        // error
        server.httpFail();
      }
    }
  }
  else
  {
    server.httpFail();

Serial.print("404 0");

  }
Serial.println();
}


/* The default page just returns HTML to show the image */
void defaultCmd(WebServer &server, WebServer::ConnectionType type, char *url_tail, bool tail_complete)
{
  fileCmd(server, type, "i.htm", true);
}


void cleanValue(char *s)
{
  int i = 0;
  int len = strlen(s);

  for(i = 0; i < len; i++)
  {
    if(!(isalnum(*s) || (ispunct(*s) && *s != '<' && *s != '>')))
    {
      *s = ' ';
    }
    s++;
  }
}

void chatCmd(WebServer &server, WebServer::ConnectionType type, char *url_tail, bool tail_complete)
{
//  unsigned long time_start = millis();
  int8_t filehandle;
  char paramname[10];
  char name[51];
  char message[201];

#define READ_BUFFER_SIZE 50

  // HEAD: just return a successful response (to indicate page exists - we don't know content-length)
  // GET: we were called for the first time - just display current info
  // POST: we have data to handle - check, add, display

displayRequest(server, type, "chat");

  if(type == WebServer::HEAD)
  {

Serial.println("200 -1");
    server.httpSuccess("text/html");
    return;
  }


  if(type == WebServer::POST)
  {
    // capture the input data, validate, and add to chatdata.txt
    // first, let's assume that the parameters are coming in order?
    server.readPOSTparam(paramname, 10, name, 51);
    server.readPOSTparam(paramname, 10, message, 201);

    // parse the message here... remove chars
    cleanValue(name);
    cleanValue(message);    

    if(strlen(message) > 0)
    {
      filehandle = ummc1.open("/w/chatdata.txt", OPEN_APPEND);
    
      if(filehandle > 0)
      {
        ummc1.writeln_prep(filehandle);
        ummc1.print(name);
        ummc1.print(" : ");
        ummc1.print(message);
        ummc1.writeln_finish();
        
        ummc1.close(filehandle);
      }
    }
  }

  if(type == WebServer::GET || type == WebServer::POST)
  {
    // ok, just spit out the page/form/data

    if(getFileSize("/w/ws_top_html.seg") > 0)
    {

Serial.print("200 -1");

      server.httpSuccess("text/html");

      delay(1);
    
//Serial.print('t');
      spewFile(server, "/w/ws_top_html.seg");
//Serial.print('T');

//Serial.print('n');
      spewFile(server, "/w/ws_chat_notice.seg");
//Serial.print('N');

//Serial.print('f');
      spewFile(server, "/w/ws_form_html.seg");
//Serial.print('F');

//Serial.print('d');
      server.print("<pre>\r\n");

      if(spewFile(server, "/w/chatdata.txt") < 0)
      {
        // file is empty (or error occurred)
        server.print("No messages");
      }

      server.print("</pre>\r\n");
//Serial.print('D');

//Serial.print('b');
      spewFile(server, "/w/ws_bottom_html.seg");
//Serial.print('B');
//Serial.print(':');
//Serial.println(millis() - time_start);

    }
    else
    {
      // card not inserted?

Serial.print("404 0");

      server.httpFail();
    }
  }
  else
  {
    // unknown method

Serial.print("404 0");

      server.httpFail();
  }

Serial.println();

}


void privateCmd(WebServer &server, WebServer::ConnectionType type, char *url_tail, bool tail_complete)
{
//  unsigned long time_start = millis();

displayRequest(server, type, "private");

  if(strcmp(server.getUsername(), "kotter") == 0 && strcmp(server.getPassword(), "sweathog") == 0)
  {

    if(getFileSize("/w/ws_top_html.seg") > 0)
    {

Serial.print("200 -1");

      server.httpSuccess("text/html");

      delay(1);

//Serial.print('t');
      spewFile(server, "/w/ws_top_html.seg");
//Serial.print('T');
      
      server.print("Welcome back, Kotter.");

//Serial.print('b');
      spewFile(server, "/w/ws_bottom_html.seg");
//Serial.print('B');
//Serial.print(':');
//Serial.println(millis() - time_start);
    }
    else
    {
      // error
      // card not inserted?

Serial.print("404 0");

      server.httpFail();
    }
  }
  else
  {
    // Authorization required
//    Serial.print("FAIL\r\nU: ");
//    Serial.println(server.getUsername());
//    Serial.print("P: ");
//    Serial.println(server.getPassword());

Serial.print("401 0");

    server.httpAuthRequired("Secure Area");

  }

Serial.println();

}


void setup()
{
  Serial.begin(115200);
  ummc_s.begin(38400);

  Serial.println("Initializing uMMC");

  ummc1.sync();
  
  Serial.print("uMMC Version: ");
  Serial.println(ummc1.version());
  
  // setup the Ehternet library to talk to the Wiznet board
  Ethernet.begin(mac, ip);

  /* register our default command (activated with the request of
   * http://x.x.x.x/ */
  webserver.setDefaultCommand(&defaultCmd);

  /* register our page output command */
  webserver.addCommand("p/", &fileCmd);

  /* register our chat command */
  webserver.addCommand("chat", &chatCmd);

  /* register our private area */
  webserver.addCommand("private", &privateCmd);

  /* start the server to wait for connections */
  webserver.begin();
}

void loop()
{
  // process incoming connections one at a time forever
  webserver.processConnection();
  delay(200);
}

```

