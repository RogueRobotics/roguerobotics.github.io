---
layout: single
title: Open
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

Opens a file handle in one of 4 different modes.

**NOTE:** If a file is created, the file modification date is set to the current time from the built-in RTC (Real Time Clock).  You can change the time by using the [Time]({{ base_path }}/documentation/common/commands/time) command.  You can modify the file modification date using the [Change Timestamp](change_timestamp) command.
{: .notice--info}

## Format

`O` *`fh`* *`mode`* *`path`*

## Parameters

  * *`fh`* is a file handle (1 - 4).  Use the [Free Handle](free_handle) command to get a free file handle.
  * *`mode`* is one of:
    * "`R`" -- Open in read-only mode.  No data can be written to the file.
      * <span class="notice--danger">The filename in the path <u>must</u> exist.</span>
    * "`W`" -- Open in write mode.  This opens a <u>new</u> file for writing.  The file must not already exist.
      * <span class="notice--danger">The filename in the path must <u>NOT</u> already exist.</span>
    * "`A`" -- Open in append mode.  This opens a new or existing file for writing.  Once opened, the file handle is positioned at the end of the file.
      * <span class="notice--danger">If the filename in the path does not exist, it will be created.</span>
    * "`RW`" -- Open in read/write mode.  This opens a new or existing file for reading and/or writing.  Once opened, the file handle is positioned at the <u>beginning</u> of the file.
      * <span class="notice--danger">If the filename in the path does not exist, it will be created.</span>
  * *`path`* is the absolute path to a file/directory.  A properly formatted path must begin with a "`/`" (forward slash) and begins at the root directory.  Subdirectories are separated with "`/`" (forward slash).
    * e.g. `/logs/january/jan3.log`

## Response Format

| *`NULL`* | Success |
| [`Enn`]({{ base_path }}/documentation/common/error_codes.html) | [An error occurred]({{ base_path }}/documentation/common/error_codes.html) |

## Example

Open a file for reading:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">O 1 R /LOGS/JANUARY/JAN03.LOG</div>
</div>

Open a file for reading and writing:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">O 1 RW /www/httpdocs/chatlog/chatlog002.log</div>
</div>
