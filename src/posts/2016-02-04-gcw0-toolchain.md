---
title: Compiling mips toolchain with Crosstool-ng under Cygwin
author: Dmitry Smagin
description: How to compile GCC toolchain using Crosstool-ng scripts on Windows under Cygwin
published: 2016-02-04T01:00:00Z
tags: mips, jz47xx, GCW Zero, OpenDingux, Cygwin, Crosstool-NG
---

# Compiling mips toolchain with Crosstool-ng under Cygwin

# Steps to build mips toolchain

## 1. Make Windows NTFS case sensitive

Crosstool-NG needs case sensitive file system. To achieve this set the registry value

```
HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\kernel\ dword:obcaseinsensitive
```

to 0 and reboot the machine.


## 2. Install Cygwin

Cygwin 32-bit is recommended for most compatibility (latest version 2.4.1).
Download [setup-x86.exe](http://cygwin.com/setup-x86.exe)
and run install. The default path is `C:\Cygwin`.

Highlight additional packages (dependencies are added automatically):

* gcc-core
* gcc-g++
* gcc-java
* libgcc1
* gperf
* bison
* flex
* wget
* patch
* make
* libtool
* libncurses-devel
* libintl-devel
* texinfo
* git
* zip
* unzip
* help2man
* vim (optional)

After installation is complete run `C:\Cygwin\Cygwin.bat` and enter bash shell.
It will emulate normal linux shell as close as possible and everything will be
operated from there.

```
> $ cd /
> $ mkdir /opt /src
```

/opt is where final toolchain will be placed, /src is for crosstool-NG sources.

## 3. Install crosstool-NG

The latest version for the moment is 1.22.0, take it from
[the official site](http://crosstool-ng.org)

```
> $ cd /src
> $ tar -xf crosstool-ng-1.22.0.tar.bz2
> $ cd crosstool-ng
> $ ./bootstrap
> $ ./configure --enable-local
```

If configure complains about some missing package, run setup-x86.exe again and install it

```
> $ make

> # you may have an error (no longer valid for crosstool-ng 1.22.0):
> # nconf.c: In function «main»
> # nconf.c:1521:11: Error: lvalue required as left operand of assignment
> #
> # just comment out the string 1521 in kconfig/nconf.c:
> # //ESCDELAY=1;
> # and type `make` again

> $ make install
```

## 4. Run crosstool-NG

```
> $ ./ct-ng menuconfig
```

**Paths and misc options**<br>
`CT_PREFIX_DIR="/opt/gcw0-toolchain/usr"`

**Target options**<br>
Target architecture=mips<br>
Endianness=little endian<br>
Bitness=32 bits (default)<br>
Tune for cpu=mips32r2<br>
Floating point=hardware<br>
Abi=o32 (default)<br>

**Toolchain options**<br>
Tuple's vendor string=gcw0<br>
Toolchain type=cross (default)<br>

**Operating system**<br>
Target OS=linux<br>
Linux kernel=4.3 (default)<br>

**Binary utilities**<br>
binutils version=2.25.1 (default)<br>

**C compiler**<br>
gcc version=5.2.0 (default)<br>
`[*] C++`<br>
`[ ] Java`<br>
`[*] Enable GRAPHITE loop optimizations`<br>
`[*] Enable LTO`<br>

**C library**<br>
C library=uclibc<br>
uclibc version=0.9.33.2<br>
Configuration file=uclibc.config (download from
[here](https://github.com/gcwnow/buildroot/raw/opendingux-2014.02/board/opendingux/gcw0/uclibc.config))<br>
Threading implementations to use=linuxthreads<br>
`[*] Add support for WCHAR`

Save an alternate configuration file
= gcw0.config and .config

## 5. Run build

```
> $ ./ct-ng build
```

Attention! There may be problems with linux-headers (wrong urls) etc.

## 6. Adding libraries

After compilation is done you'll get the toolchain in /opt/gcw-toolchain, but this is a minimalistic toolchain without additional libraries like SDL, mikmod etc.

The right way to populate the toolchain with libraries is to compile them from sources, but in fact all headers and libraries could be just copied from ready-to-use linux toolchain.

Copy the following text to copy_libs.sh, place it to /opt and run.

````
#!/bin/sh

# Assume we are in /opt and GCW Zero toolchain is compiled to
# /opt/gcw0-toolchain

wget http://www.gcw-zero.com/files/opendingux-gcw0-toolchain.2014-08-20.tar.bz2

mkdir -p tmp
tar -xf opendingux-gcw0-toolchain.2014-08-20.tar.bz2 -C tmp

CP="cp -dR"
SRC=tmp/gcw0-toolchain/usr/mipsel-gcw0-linux-uclibc/sysroot
DST=gcw0-toolchain/usr/mipsel-gcw0-linux-uclibc/sysroot

# Perhaps not needed
$CP $SRC/../lib $DST
$CP $SRC/lib $DST

# Copy headers and libs
$CP $SRC/usr/include $DST/usr
$CP $SRC/usr/lib $DST/usr

# Fix 'unresolved reference to __tls_get_addr()'
rm -f $DST/usr/lib/libstdc++*

# Copy *-config scripts
$CP $SRC/usr/bin/*-config $DST/../../bin

# Create symlinks
LN="ln -sf"
NAME=mipsel-gcw0-linux-uclibc-
LINK=mipsel-linux-

cd gcw0-toolchain/usr/bin
$LN ${NAME}addr2line	${LINK}addr2line
$LN ${NAME}ar		${LINK}ar
$LN ${NAME}as		${LINK}as
$LN ${NAME}c++		${LINK}c++
$LN ${NAME}c++filt	${LINK}c++filt
$LN ${NAME}cc		${LINK}cc
$LN ${NAME}cpp		${LINK}cpp
$LN ${NAME}elfedit	${LINK}elfedit
$LN ${NAME}g++		${LINK}g++
$LN ${NAME}gcc-ar	${LINK}gcc-ar
$LN ${NAME}gcc-nm	${LINK}gcc-nm
$LN ${NAME}gcc-ranlib	${LINK}gcc-ranlib
$LN ${NAME}gcc		${LINK}gcc
$LN ${NAME}gcov-tool	${LINK}gcov-tool
$LN ${NAME}gcov		${LINK}gcov
$LN ${NAME}gprof	${LINK}gprof
$LN ${NAME}ld		${LINK}ld
$LN ${NAME}ld.bfd	${LINK}ld.bfd
$LN ${NAME}nm		${LINK}nm
$LN ${NAME}objcopy	${LINK}objcopy
$LN ${NAME}objdump	${LINK}objdump
$LN ${NAME}ranlib	${LINK}ranlib
$LN ${NAME}readelf	${LINK}readelf
$LN ${NAME}size		${LINK}size
$LN ${NAME}strings	${LINK}strings
$LN ${NAME}strip	${LINK}strip
$LN ${NAME}ldd		${LINK}ldd
$LN ${NAME}populate	${LINK}populate

cd ../..
````



