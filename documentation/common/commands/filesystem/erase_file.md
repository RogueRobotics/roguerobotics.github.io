---
layout: single
title: Erase File
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

Erases/deletes the given file/directory.  If the path given is a directory, it must be empty before it can be deleted.

## Format

`E` *`path`*

## Parameters

  * *`path`* is the absolute path to a file/directory.  A properly formatted path must begin with a "`/`" (forward slash) and begins at the root directory.  Subdirectories are separated with "`/`" (forward slash).
    * e.g. `/logs/january/jan3.log`

## Response Format

| *`NULL`* | Success |
| [`Enn`]({{ base_path }}/documentation/common/error_codes.html) | [An error occurred]({{ base_path }}/documentation/common/error_codes.html) |

## Example

To delete a directory:

```
E /emptydir
```

To delete a file:

```
E /filename.txt
```
