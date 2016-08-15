---
layout: single
title: Make Directory
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

The **Make Directory** command will create a directory at the path specified.

## Format

`M` *`path`*

## Parameters

  * *`path`* is the absolute path to a file/directory.  A properly formatted path must begin with a "`/`" (forward slash) and begins at the root directory.  Subdirectories are separated with "`/`" (forward slash).
    * e.g. `/logs/january/jan3.log`

## Response Format

| *`NULL`* | Success |
| [`Enn`]({{ base_path }}/documentation/common/error_codes.html) | [An error occurred]({{ base_path }}/documentation/common/error_codes.html) |

## Example

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">M /LOGS/JANUARY</div>
</div>
