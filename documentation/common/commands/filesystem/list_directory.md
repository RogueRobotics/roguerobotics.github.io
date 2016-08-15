---
layout: single
title: List Directory
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

The **List Directory** command will list all the files in a given path.  If the path is a file, then only the details for that file are given.  If the path contains wildcards, then the files matching the pattern will be returned.

***IMPORTANT:*** **List Directory** (`L` *`path`*) lists all files that match the given path without interruption.  If a directory is large, this can be difficult to manage.  In that case, use `LS` *`path`* to begin a directory listing iteration process, then use `LI` *`pattern`* to iterate through the listings.
{: .notice--warning}

## Format

| `L` *`path`*    | Full listing, no interruption |
| `LC` *`path`*   | Count of all files matching *`path`* |
| `LS` *`path`*   | Starts a List Directory iteration |
| `LI` *`pattern`* | Iterates through a directory listing,<br />returning the next file that matches *`pattern`*. |

### Notes

For `L` *`path`* and `LC` *`path`*, *`path`* can also contain wildcards ("`?`" and "`*`").

In `LS` *`path`*, *`path`* can not contain wildcards, and must be a directory.

*`pattern`* is required for `LI` *`pattern`*. To list all files, use "`*`" to match everything.

## Parameters

  * *`path`* is the absolute path to a file/directory.  A properly formatted path must begin with a "`/`" (forward slash) and begins at the root directory.  Subdirectories are separated with "`/`" (forward slash).
    * e.g. `/logs/january/jan3.log`
  * *`pattern`* - a filename pattern which can contain wildcards ("`?`" and "`*`").

## Response Format

| `«SP»`*`response`* | Success - below |
| [`Enn`]({{ base_path }}/documentation/common/error_codes.html) | [An error occurred]({{ base_path }}/documentation/common/error_codes.html) |

*`response`* has one of two formats based on the "`L`" setting.

`L` = 0:

```
«sp»D | ss..sss filename1«cr»
D | ss..sss filename2«cr»
...
D | ss..sss filenameN«cr»
```

where:

  * `D` indicates a directory
  * `ss..sss` is the size of the file
  * `filenameN` is the filename or directory name

`L` = 1:

```
«sp»DRHSA yyyy/mm/dd hh:mm:ss ss..sss filename1«cr»
DRHSA yyyy/mm/dd hh:mm:ss ss..sss filename2«cr»
...
DRHSA yyyy/mm/dd hh:mm:ss ss..sss filenameN«cr»
```

where:

  * `DRHSA` are the attributes for the file.  If the attribute is not set, the value is "`-`".  `D` indicates a directory.
  * `yyyy/mm/dd hh:mm:ss` is the modification date of the file/directory.
  * `filenameN` is the filename or directory name

## Example

"`L`" setting = 0:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">L /</div>
<div class="wrap wrap_response">«sp»D DCIM«cr»
721886 B0000.mp3«cr»
40192 B0001.mp3«cr»
23318 B0002.mp3«cr»
46519 hidden.txt«cr»</div>
</div>


"`L`" setting = 1:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">L /</div>
<div class="wrap wrap_response">«sp»D---- 2009/05/10 11:03:54 DCIM«cr»
----A 721886 2009/05/13 10:12:16 B0000.mp3«cr»
----A 40192 2009/05/13 10:12:16 B0001.mp3«cr»
----A 23318 2009/05/13 10:12:16 B0002.mp3«cr»
--H-A 46519 2009/05/13 10:22:38 hidden.txt«cr»</div>
</div>


Using wildcards:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">L /PICTURES/*.JPG</div>
<div class="wrap wrap_response">«sp»----A 2008/09/23 09:18:32 2021392 IMG_2538.JPG«cr»
----A 2008/09/23 09:31:26 1662290 IMG_2542.JPG«cr»
----A 2008/09/23 09:32:02 1893947 IMG_2543.JPG«cr»
----A 2008/10/30 12:34:50 1117269 IMG_2551.JPG«cr»</div>
</div>


File count (with wildcard):

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">LC /PICTURES/*.JPG</div>
<div class="wrap wrap_response">«sp»4</div>
</div>


Iteration example:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">LS /PICTURES</div>
<div class="wrap wrap_response">«sp»</div>
<div class="wrap wrap_host_command">LI *.JPG</div>
<div class="wrap wrap_response">«sp»----A 2008/09/23 09:18:32 2021392 IMG_2538.JPG«cr»</div>
<div class="wrap wrap_host_command">LI *.JPG</div>
<div class="wrap wrap_response">«sp»----A 2008/09/23 09:31:26 1662290 IMG_2542.JPG«cr»</div>
<div class="wrap wrap_host_command">LI *.JPG</div>
<div class="wrap wrap_response">«sp»----A 2008/09/23 09:32:02 1893947 IMG_2543.JPG«cr»</div>
<div class="wrap wrap_host_command">LI *.JPG</div>
<div class="wrap wrap_response">«sp»----A 2008/10/30 12:34:50 1117269 IMG_2551.JPG«cr»</div>
<div class="wrap wrap_host_command">LI *.JPG</div>
<div class="wrap wrap_response">E07</div>
</div>

