---
title: Making of 'The Last Mission' remake
author: Dmitry Smagin
published: 2014-08-17T01:00:00Z
tags: game, retro
---

# Making of 'The Last Mission' remake

## Origins

The Last Mission[^1], a maze shooter game, was originally released by Spanish company OperaSoft in 1987 on the following platforms: MSX1, MSX2, Amstrad CPC, ZX-Spectrum and 8086/88 PC. Due to varying hardware capabilities, all versions of the game differ in terms of graphics and sound. The most advanced of these ports was the MSX2 version, which featured rich-colored graphics and PSG sound supplied by the General Instruments AY-3-8910[^2].

## First attempt

The story started in 2006 when I stumbled upon an 8086/88 PC version of 'The Last Mission' which was in fact a hacked diskette image repacked in a small and tidy .com executable. The game ran extremely fast on a modern PC, and trying to slow it down I decided to disassemble the executable and patch it. While disassembling I found that the code inside was very weird and superfluous and could be optimized greatly with little effort. Its weirdness made me think that most part of it was macro-translated from z80 assembler to the x86 variant.

After a longer period of patching and data examination an idea of game reimplementation came to mind. For some crazy reason I chose Sphinx C-- as a primary language. It was a cross between C and assembler and could generate small executables for DOS and Windows. In addition to this a simple tool was written to extract game data from the .com executable and save in a text format, ready to be included in the source code.

The first alpha version could be compiled both for DOS and Windows (the latter used GDI bitmaps for graphics) and in-game you could do nothing more but move the flying cannon around, go from screen to screen and watch enemies here and there which didn't move (but were animated though). This version was never released and, in fact, the drawbacks and limitations of C-- made me put aside this game for some time.

## Second attempt

After some years of stalling the game was revived. It was completely rewritten in FreeBasic[^3] which was chosen because it was easy to use and its community was rather positive towards retro games. Unfortunately, the DOS version was dropped.

A fully playable game was released in 2009 and it featured some Adlib-emulated sound effects and title music.[^4]

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
    <img src="/img/0_58cb3_617579ba_orig.gif" width="320" height="200"/>
    <img src="/img/0_58cb4_a4223970_orig.gif" width="320" height="200"/>
</div>

FreeBasic version. Looking exactly like the original CGA port for 8086/88 PC.


## Third attempt

Due to my involvement in the Dingoo A320 scene I decided to port 'The Last Mission' to this nice retro handheld. As FreeBasic didn't support anything else but x86 as target, I rewrote the game once more, this time using plain C and SDL to ensure cross-platform compatibility.

The first release was made in 2011 supporting Dingoo Native OS and Dingux[^5]. A year later in 2012 all game graphics were recolored using the MSX2 port as a reference and some elements of gameplay were made more faithful to the original. Sound effects remained the same, but the title music was replaced with a remixed version of the original Last Mission music, which I made up myself using Radtracker.

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
    <img src="/img/0_71c2e_75da41d9_orig.png" width="320" height="200"/>
    <img src="/img/0_71c2f_6f07a6f8_orig.png" width="320" height="200"/>
</div>

Dingoo A320 version. Graphics were recolored using the MSX2 port as a reference.

## Final touches...

Of course, the game was compiled for GCW Zero handheld when it came to the scene but it was still the same Dingoo version. This could be the end of the story, as I didn't plan to continue developing. However, I was contacted by Alexey Pavlov who decided to port the game to iOS[^6] devices. He added some very nice features like different backgrounds for levels, shadows, more weapons and bonuses. He also went as far as adding a secret level and a new set of sound effects and music made by Mark Braga. Most of these changes were included into the main source tree.

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
    <img src="/img/0_92873_2048b64_orig.png" width="320" height="200"/>
    <img src="/img/0_92875_d07f1c74_orig.png" width="320" height="200"/>
</div>

GCW Zero version. Backgrounds and numerous other features were added.

## Back to its roots

Unfortunately, according to Alexey, 'The Last Mission' didn't get much attention on iOS, but his efforts weren't in vain because in early 2013 I was contacted by Pedro Ruiz, the original programmer of the game and founder of OperaSoft. He was very surprised to see his own game running on iOS and gave permission to distribute the remake under the GPL2 license[^7].

After that 'The Last Mission' remake was allowed to enter GCW Zero repository[^8] and can be freely downloaded from there[^9].

[^1]: http://www.mobygames.com/game/last-mission
[^2]: http://en.wikipedia.org/wiki/General_Instrument_AY-3-8910
[^3]: http://freebasic.net/forum/viewtopic.php?f=8&t;=13058&hilit;=last+mission
[^4]: http://games.freebasic.net/dumpbyid.php?input=134
[^5]: http://boards.dingoonity.org/dingoo-releases/the-last-mission-dingoo-sdl-remake-for-native-os/
[^6]: http://www.youtube.com/watch?v=-aaPZMIKQY4
[^7]: http://sourceforge.net/projects/lastmission/
[^8]: http://repo.gcw-zero.com
[^9]: http://www.gcw-zero.com/file.php?file=last-mission.opk
