---
layout: single
title: Preallocate A File For Faster Writing
---
{% include base_path %}

Because of how Microsoft's FAT file system works, host systems need to extend files frequently when adding more data, and this means that when a cluster boundary is reached, a new cluster needs to be found and added to the file cluster chain.

Complicated?  Not really, but it does cause timing problems when using a microcontroller to stream data to an SD/MMC card.

How do we get around the cluster allocation timing problems?

We preallocate the file - that is, we extend the file at the *before* we begin writing data to it.

Here is how we do it.

(Note: The command examples are for the uMMC - just add `FC` to the beginning of the command for the rMP3 and uMP3)

1. Create your file:
  * e.g. `O 1 RW datafile.txt`
1. Now extend it well beyond what you'll need to write:
  * e.g. `J 1 100000` - this will pre-allocate 100,000 bytes to the file.
1. Now jump back to the start:
  * e.g. `J 1 0`
1. Begin writing loop/procedure:
  * e.g. `W 1 200` (followed by data), rinse, repeat
1. When you are done, you can truncate the file to the new size:
  * e.g. `U 1` - this deletes ALL data after the current position

