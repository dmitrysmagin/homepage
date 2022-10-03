module.exports = {
    template: 'Games.svelte',
    layout: 'Layout.svelte',
    all: () => [{ slug: '/games' }],
    permalink: ({ request }) => request.slug,
    data: ({ data }) => ({
        items: [
            {
                title: 'The Last Mission Remake',
                paragraphs: [
                    '<p>Originally this game was released in 1987 by Spanish company Opera Soft for multiple 8-bit computers ' +
                    'including MSX1, MSX2, ZX-Spectrum, Amstrad CPC and even x86 PC. ' +
                    'As most games of that era, The Last Mission was a screen-to-screen labyrinth game with shooter elements.</p>',

                    '<p>You control a flying robot with laser which have to guide the caterpillar platform through the levels ' +
                    'of the undeground labyrinth up to the planet\'s surface. The robot can fly only a limited amount of time ' +
                    'and have to land on the platform to restore the energy. The platform in turn cannot fly and shoot and ' +
                    'can move on the floor only, so the robot should shoot out enemies and clear the passage ahead in order ' +
                    'to move it further.<p>',

                    '<p>This remake is based on the x86 PC version with 4-color CGA graphics and beeper sound. All graphics ' +
                    'was colorized to 256-color palette by hand using MSX2 version as an example. Later Alexey Pavlov ported ' +
                    'this game to iOS devices and did some gameplay and graphical enhancements as well. He also added sound ' +
                    'effects and free music by Mark Braga.<br>' +
                    'Most probably, iOS version is nowhere to be found now, sorry for that.</p>'
                ],
                authors: [
                    'Pedro Ruiz - the original author and Opera Soft founder',
                    'Dmitry Smagin - main coding',
                    'Alexey Pavlov - additional coding and gfx, porting to iOS devices',
                    'Mark Braga - music and sfx'
                ],
                downloads: [
                    {
                        href: 'https://github.com/dmitrysmagin/last-mission/releases/download/v0.8/last-mission-win-0.8.zip',
                        hrefText: 'last-mission-win-0.8.zip',
                        description: 'Pre-compiled binary for win95 or later'
                    },
                    {

                    }
                ]
            },
            {
                title: "Wetspot II",
                paragraphs: [
                    '<p>Originally Wetspot II was written by Angelo Mottola (Enhanced Creations) in 1997-98. Despite being ' +
                    'programmed in QuickBasic 4.5 it used some low-level techniques like machine code injecting, EMS memory ' +
                    'and accessing the audio hardware directly to achieve an unprecendent quality for a hobbyist game. The ' +
                    'level editor was released as well, so lots of 3-rd party add-ons appeared later.</p>',

                    '<p>The game itself resembles Pengo or Kwiksnax but with a crab as the main character. You have to kill ' +
                    'enemies by pushing blocks at them at a limited amount of time. First levels are more action oriented, ' +
                    'but as you proceed they become more complex and puzzle-like.</p>',

                    '<p>Currently you can play the original game using Dosbox if you are lucky enough to find the latest version ' +
                    'and set everything up correctly. Luckily, the original site was archived and is available ' +
                    '<a href="https://geocities.restorativland.org/SiliconValley/Lakes/7303/">here</a>.</p>',

                    '<p>This is a full re-implementation of game engine entirely in C using SDL library written in 2013-2014. ' +
                    'Multiple target platforms are supported: windows, linux and all others that have SDL. All graphics, sound' +
                    'effects and even adlib midi music were preserved to keep the old DOS feel.</p>',

                    '<p>Initially this remake was planned as an exclusive for GCW-Zero handheld and was ' +
                    '<a href="http://www.gcw-zero.com/news.php?id=8">released</a> for it with different ' +
                    'music due to copyright concerns: </p>',

                    '<p>Some differences with the original game:</p>' +
                    '<ul><li>Included all 3rd party level packs available: chris2, funk, nekro, return, ricland, seav, ' +
                    'squinky, surprise, wafn.</li>' +
                    '<li>Palette fade in/out effects are dropped</li>' + 
                    '<li>Menu item \'OPTIONS\' is dropped, because there\'s nothing to set up anymore</li>' + 
                    '<li>Cursor movement in the menu is not animated</li>' +
                    '<li>While in game the level timer is now shown in the status bar</li>' +
                    '<li>The score font is different when you pick up bonuses</li></ul>'
                ],
                authors: [
                    'Angelo Mottola - the original author'
                ],
                downloads: [
                    {}
                ]
            }
        ]
    }),
};
