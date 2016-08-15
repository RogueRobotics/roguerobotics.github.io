---
layout: single
title: Copy
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

This command will copy data from an open file to another open file.
Requirements: Two files must be open, one for reading, and the second for writing.

e.g.

```
O 1 R /sourcefile.txt
O 2 RW /destfile.txt
```

Copy File will copy from the current location in the source file, up to "num" bytes if specified, to the destination file (starting at the destination's current location).

**NOTE:** You can interrupt the transfer at any time by sending `«ESC»` (ASCII 27, HEX 0x1B).
{: .notice--info}

## Format

`B` *`fh1` `fh2`* *`[num]`*

## Parameters

  * *`fh1`* and *`fh2`* are file handles (1 - 4).  Use the [Free Handle](free_handle) command to get a free file handle.
  * *`num`* is the number of bytes to copy from *`fh1`* to *`fh2`*.  If *`num`* is not given, or is greater than the size of *`fh1`*, then the entire contents of *`fh1`* is copied.

## Response Format

| *`NULL`* | Copy successful (setting `C` = 0) |
| *`response`* | Copy successful (see below) |
| [`Enn`]({{ base_path }}/documentation/common/error_codes.html) | [An error occurred]({{ base_path }}/documentation/common/error_codes.html) |

*`response`* depends on the `C` setting shown below.

| `C` = 0 | *`NULL`* |
| `C` = 1 | `#########...####` |
| `C` = 2 | `nn..nn bytes copied at r..rr bytes/second` |
| `C` = 3 | `#####...####nn..nn bytes copied at r..rr bytes/second` |

## Example

To copy 200 bytes from the current location of handle 1 to handle 2:

```
B 1 2 200
```

To copy the entire source file to the destination file:

```
O 1 R /sourcefile.txt
O 2 RW /destfile.txt
B 1 2
```

To copy 600 bytes from position 12000 of handle 1, to handle 3, starting at position 50000:

```
O 1 R /sourcefile.txt
O 3 RW /destfile.txt
J 1 12000
J 3 50000
B 1 3 600
```

To copy the entirety of handle 1 to the end of handle 2 (appended):

```
O 1 R /sourcefile.txt
O 2 RW /destfile.txt
J 2 E
B 1 2
```

or (note that the destination file is opened for append)

```
O 1 R /sourcefile.txt
O 2 A /destfile.txt
B 1 2
```
