---
layout: single
title: Close
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

Closes an open file handle.  If no file handle is given, all open file handles are closed.

## Format

`C` *`[fh]`*

## Parameters

  * *`fh`* is a file handle (1 - 4).  Use the [Free Handle](free_handle) command to get a free file handle.

## Response Format

| *`NULL`* | Success |
| [`Enn`]({{ base_path }}/documentation/common/error_codes.html) | [An error occurred]({{ base_path }}/documentation/common/error_codes.html) |

### Example

Close file handle 1:

```
C 1
```

Close all files:

```
C
```
