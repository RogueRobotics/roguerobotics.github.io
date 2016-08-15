---
layout: single
title: Set Attributes
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

Change the attributes of a file.

In the FAT file system, there are 4 attributes which can be set:

  * A = Archive
  * H = Hidden
  * R = Read Only
  * S = System

**NOTE:** You can not combine adding and removing of attributes in a single command. i.e. you must only add or only remove attributes per command.
{: .notice--info}

## Format

`A` `+|-` *`attribute`* *`path`*

## Parameters

  * *`attribute`* is one or more of "R", "H", "S", or "A".
  * *`path`* is the absolute path to a file/directory.  A properly formatted path must begin with a "`/`" (forward slash) and begins at the root directory.  Subdirectories are separated with "`/`" (forward slash).
    * e.g. `/logs/january/jan3.log`

## Response Format

| *`NULL`* | Success |
| [`Enn`]({{ base_path }}/documentation/common/error_codes.html) | [An error occurred]({{ base_path }}/documentation/common/error_codes.html) |

## Example

To set "read-only" attribute for a file:

```
A +R /filename.txt
```

To remove "hidden" and "system" attributes for a file:

```
A -HS /filename.txt
```
