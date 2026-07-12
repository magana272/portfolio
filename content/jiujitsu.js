// Jiu-jitsu content — pure data. features/off-the-clock/jiujitsu.js renders the
// #jiujitsu band from this: the gym-name poster, the tagged training photo, the
// Skrap Pack credit logo, and the disciplines line. Tag coordinates are percent
// offsets over the photo; HTML entities are preserved verbatim.
export const JIUJITSU = {
    title: 'El Ni&ntilde;o Training Center',
    photo: {
        src: 'static/media/img/jiujitsu/web/IMG_4501-web.jpg',
        full: 'static/media/img/jiujitsu/web/full/IMG_4501.webp',
        w: 1125, h: 1500,
        alt: 'After training at the jiu-jitsu gym with teammates'
    },
    tags: [
        { handle: 'kennythaiger', left: '24%', top: '26%' },
        { handle: 'chtrnguy', left: '13%', top: '22%' },
        { handle: 'gio.cue', left: '79%', top: '22%' }
    ],
    credit: {
        href: 'https://instagram.com/skrappack',
        label: 'Skrap Pack',
        logo: 'static/media/img/jiujitsu/web/skrappack.webp',
        w: 1500, h: 844
    },
    disciplines: 'MMA | Jiu-Jitsu | Muay Thai | Wrestling | Boxing',
    coach: { href: 'https://instagram.com/gilbertmelendez', name: 'Gilbert Melendez' }
};
