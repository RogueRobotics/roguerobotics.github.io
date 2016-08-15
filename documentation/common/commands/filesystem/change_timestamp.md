---
layout: single
title: Change Timestamp
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

Changes the "modified" time of the given file/directory.  All parameters are required.

## Format

`D` *`year month day hour min sec path`*

## Parameters

  * *`year`* is full 4 digit year.
  * *`month`* is 1 → 12.
  * *`day`* is 1 → 31 (depending on month).
  * *`hour`* is in 24 hour format (0 → 23).
  * *`min`* is 0 → 59.
  * *`sec`* is 0 → 59.
  * *`path`* is the absolute path to a file/directory.  A properly formatted path must begin with a "`/`" (forward slash) and begins at the root directory.  Subdirectories are separated with "`/`" (forward slash).
    * e.g. `/logs/january/jan3.log`

## Response Format

| *`NULL`* | Success |
| [`Enn`]({{ base_path }}/documentation/common/error_codes.html) | [An error occurred]({{ base_path }}/documentation/common/error_codes.html) |

## Example

```
D {{ site.time | date: '%Y' }} 8 11 17 22 00 /filename.txt
```
