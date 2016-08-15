---
layout: single
title: Communications Protocol
---
{% include base_path %}
{% include toc icon="list" title="Index" %}

## Description

The communications protocol used by the uMMC, uMP3 and rMP3 modules employs a simple and robust asynchronous serial control protocol.

A command prompt ">" ("greater than" symbol, ASCII 62, HEX
0x3E) indicates that the uMMC is ready to accept a command.  A command can
be sent, a response will be returned, and the command prompt will be sent
again (for synchronization).

To force synchronization, an escape (`«esc»`, ASCII 27, HEX 0x1B) can be sent to the module at any time, which will flush the command input buffer, and a command prompt will be returned.

**INFO:** You can change the command prompt to another character by changing the [Prompt Character](settings.html#prompt-character) setting.
{: .notice--info}

The uMP3 and the rMP3 have both file system and audio playback commands.  The command sets have been separated by using a top level command (e.g. `FC` for file system commands) and use the entire set of sub-commands for that function.  Because the uMMC only utilizes the [file system commands](commands/filesystem), it does not need a top level command.


Example, [**Free Handle**](commands/filesystem/free_handle) on a uMMC:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">&gt;F«cr»</div>
<div class="wrap wrap_response">1&gt;</div>
</div>

***IMPORTANT:*** The examples shown on this page display the command prompt, but in all of the examples shown in the documentation, the command prompt is left out, because it is not part of the command or response.
{: .notice--warning}

If an error occurs while processing a command, an error is returned in the format
"`Enn`".  See the [table of error codes](error_codes.html).

Example, attempt to [**Open**](commands/filesystem/open) a non-existent file on a uMP3:

<div class="wrap wrap_example wrap_monospace">
<div class="wrap wrap_host_command">&gt;FC O 1 R /LOGS/2004/FEBRUARY/FEB30.LOG«cr»</div>
<div class="wrap wrap_response">EF2&gt;</div>
</div>

## Command Format

`C«sp»Parameter1«sp»Parameter2«sp»...«cr»`

Where:

  * `C` is a single command character.
  * `«sp»` is a single space character (ASCII 32, HEX 0x20).
  * `Parameter1`, `Parameter2`, ... are parameters associated with the command
  * `«cr»` is a carriage return character (ASCII 13, HEX 0x0d)

### Command Listing Format

The documentation of the commands will follow this format:

`C Parameter1 [Parameter2 [Parameter3]]...`

  * `C` is the command character(s).
    * The uMP3 and rMP3 often use two-character top-level commands.
  * `Parameter1` is the first parameter for the command.
    * For the uMP3 and rMP3, this is often a sub-command.
  * `Parameter2` is the second parameter for the command. If it is listed inside of square brackets [ ] then the parameter is optional.

Any parameters listed inside of square brackets [ ] are optional. Most commands
that have optional parameters will require the previous parameter to be given.

### Command Response Format

In general, responses are of the format:

`[[«sp»][data]] | [Enn]`

Error codes are returned as `Enn`, where `nn` is a hexadecimal code indicating the error.  See the [table of error codes](error_codes.html).
