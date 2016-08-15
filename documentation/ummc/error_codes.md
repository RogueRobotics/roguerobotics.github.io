---
layout: single
title: uMMC Error Codes
---
{% include base_path %}

| Error Code | Description |
|:-----------|:------------|
| 02 | Command buffer overrun (i.e. command too long) |
| 03 | No free files |
| 04 | Unknown command |
| 05 | Card initialization error |
| 06 | Command formatting error |
| 07 | End of file (EOF) |
| 08 | Card not inserted |
| 09 | Card reset failure |
| 0A | Card physically write protected (check write protect switch on side of card) |
| E5 | Not a directory |
| E6 | Read only file - Can not perform command on this file |
| E7 | Not a file - command expected a directory |
| E8 | Write failure |
| E9 | Improper mode for writing (check that the file is open for writing) |
| EA | No free space (card is full) |
| EB | Given file handle is not open |
| EC | Improper mode for reading (check that the file is open for reading) |
| ED | Unrecognized mode specified in Open command |
| EF | General FAT failure - File system is corrupted (test it on a PC) |
| F1 | File handle provided is already open |
| F2 | File in path specified does not exist |
| F3 | Error while creating directory entry |
| F4 | File already exists |
| F5 | File in path specified is not valid (check spelling, and no strange characters in path) |
| F6 | Invalid handle specified |
