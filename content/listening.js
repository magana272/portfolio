// Listening & Watching content — pure data. features/off-the-clock/listening.js
// renders the #listening band as two ranked columns. Each column has a label, a
// source link, and rows; artist rows carry a square thumb, film rows a poster
// plus a year. Image URLs point at Spotify / Letterboxd CDNs.
export const LISTENING = [
    {
        label: 'On repeat',
        link: { href: 'https://open.spotify.com/user/super_grool', label: 'Spotify &rarr;' },
        kind: 'thumb',
        items: [
            { img: 'https://i.scdn.co/image/ab67616100005174c742fbc057bdbc64834a6cdc', name: 'Zach Bryan' },
            { img: 'https://i.scdn.co/image/ab67616100005174b6ace408c5e1762b36061f23', name: 'Black Country, New Road' },
            { img: 'https://i.scdn.co/image/ab67616100005174bf7a30d6fb51ae53c47868f1', name: 'Matt Maltese' },
            { img: 'https://i.scdn.co/image/ab6761610000517473479e6db034c4a43d4aee04', name: 'Dijon' },
            { img: 'https://i.scdn.co/image/ab676161000051742dc02311bf9829215cedd18d', name: 'Mk.gee' },
            { img: 'https://i.scdn.co/image/ab67616100005174fe9486c9ef6d86b4f39805c8', name: 'ROLE MODEL' },
            { img: 'https://i.scdn.co/image/ab67616100005174d324aac01e7b004a69dac3b3', name: 'Medium Build' },
            { img: 'https://i.scdn.co/image/ab67616100005174fc13849ee1941d15f8f475a8', name: 'Holly Humberstone' }
        ]
    },
    {
        label: 'Top films',
        link: { href: 'https://letterboxd.com/magana272/', label: 'Letterboxd &rarr;' },
        kind: 'poster',
        items: [
            { img: 'https://a.ltrbxd.com/resized/film-poster/4/7/4/4/7/4/474474-everything-everywhere-all-at-once-0-150-0-225-crop.jpg', name: 'Everything Everywhere All at Once', year: '2022' },
            { img: 'https://a.ltrbxd.com/resized/film-poster/4/3/2/0/0/4/432004-sound-of-metal-0-150-0-225-crop.jpg', name: 'Sound of Metal', year: '2019' },
            { img: 'https://a.ltrbxd.com/resized/sm/upload/i7/li/tp/62/i0t7F6b4R1wURRESAiw9VJNuVoV-0-150-0-225-crop.jpg', name: 'Manchester by the Sea', year: '2016' },
            { img: 'https://a.ltrbxd.com/resized/sm/upload/90/gn/c7/9k/qAwFbszz0kRyTuXmMeKQZCX3Q2O-0-150-0-225-crop.jpg', name: 'Moonlight', year: '2016' }
        ]
    }
];
