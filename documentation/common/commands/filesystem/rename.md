---
layout: single
title: Rename
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

Renames/moves a file from one path to another.

## Format

`N` *`path`*\|*`newpath`*

**INFO:** *`path`* and *`newpath`* are separated by a [vertical bar](http://en.wikipedia.org/wiki/vertical bar){:target="_blank"}/pipe/vertical slash '`|`'.
{: .notice--info}

***IMPORTANT:*** *`newpath`* must not already exist.
{: .notice--warning}

## Parameters

  * *`path`* and *`newpath`* are absolute paths to a file/directory.  A properly formatted path must begin with a "`/`" (forward slash) and begins at the root directory.  Subdirectories are separated with "`/`" (forward slash).
    * e.g. `/logs/january/jan3.log`

## Response Format

| *`NULL`* | Success |
| [`Enn`]({{ base_path }}/documentation/common/error_codes.html) | [An error occurred]({{ base_path }}/documentation/common/error_codes.html) |

## Example

Rename a file:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">N /www/index.html|/www/index.htm</div>
</div>

Move a directory:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">N /www/images|/images</div>
</div>
