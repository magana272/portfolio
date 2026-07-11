// Project content — pure data. Each entry is a Project (see components/project/project.js);
// long-form case-study copy lives in content/deep-dives.js, keyed by slug. The
// home page renders these in pages/home/home.js. `tagline` is the short label shown
// in the menu jump-list.
import { Project } from '../components/project/project.js';

export const PROJECTS = [
    new Project({
        name: 'PayPath',
        tint: '#0e6b47',   /* emerald — finance/growth */
        ink: '#0d5f40',
        category: 'swe',
        lang: 'go',
        tech: 'Go, Next.js 16, React 19, MongoDB, Docker',
        tagline: 'Debt Tracker',
        links: [
            { label: 'Live', url: 'https://pay-path-mu.vercel.app/' },
            { label: 'GitHub', url: 'https://github.com/magana272/PayPath' }
        ],
        description: 'Take control of your debt, and know where every paycheck goes after taxes and bills.',
        cover: 'static/media/img/paypathimg/bill_calendar.png',
        media: [
            'static/media/img/paypathimg/bill_calendar.png',
            'static/media/img/paypathimg/paybreakdown.png',
            'static/media/img/paypathimg/tax.png',
            'static/media/img/paypathimg/expenseBreakdown.png',
            'static/media/img/paypathimg/personalizedFinAdvice/insights.png',
            'static/media/img/paypathimg/personalizedFinAdvice/debt-payoff-strategy.png'
        ],
        deepDive: true
    }),
    new Project({
        name: 'DADA-85',
        tint: '#963c12',   /* burnt ember — the retro room and its fire */
        ink: '#8a3609',
        category: 'swe',
        lang: 'typescript',
        tech: 'TypeScript, React 19, three.js, Tailwind, Vite',
        tagline: '3D Calculator',
        links: [
            { label: 'Live', url: 'https://dada-85.vercel.app/' },
            { label: 'GitHub', url: 'https://github.com/magana272/DADA-85' }
        ],
        description: 'A calculator that lives in a three.js room, next to a vintage laptop and a burning 240Z.',
        cover: 'static/media/vid/ezgif-6804e20ef176d44d.webm',
        poster: 'static/media/img/dada85/dada85.jpg',
        media: [
            'static/media/vid/ezgif-6804e20ef176d44d.webm',
            'static/media/vid/fire.webm'
        ],
        deepDive: true
    }),
    new Project({
        name: 'Trak',
        tint: '#1c4fa1',   /* cobalt — dependable planning tool */
        ink: '#1a4489',
        category: 'swe',
        lang: 'java',
        tech: 'Java, Swing, DuckDB, Redis, MongoDB, Gradle',
        tagline: 'Sprint Planner',
        links: [
            { label: 'GitHub', url: 'https://github.com/magana272/Trak' },
            { label: 'macOS Installer', url: 'https://github.com/magana272/Trak/releases/tag/v1.0.0-installer' }
        ],
        description: 'Sprint planning without the ceremony: one core behind a GUI, a CLI, and a REST API.',
        cover: 'static/media/img/trak/trak.png',
        media: ['static/media/img/trak/trak.png'],
        deepDive: true
    }),
    new Project({
        name: 'WhatToDo',
        tint: '#5a22ad',   /* grape — playful AI discovery */
        ink: '#4c1e93',
        category: 'swe',
        lang: 'python',
        tech: 'Python, FastAPI, PostgreSQL, Docker, Render',
        tagline: 'AI Itineraries',
        links: [
            { label: 'Live', url: 'https://magana272.github.io/WhatToDo/' },
            { label: 'GitHub', url: 'https://github.com/magana272/WhatToDo' }
        ],
        description: 'Don\'t know what to do today? Let AI turn your preferences into a real itinerary.',
        cover: 'static/media/img/whattodo/Home.png',
        media: [
            'static/media/img/whattodo/Home.png',
            'static/media/img/whattodo/Results.png',
            'static/media/img/whattodo/SavedItin.png'
        ],
        deepDive: true
    }),
    new Project({
        name: 'Physiological Signal Analytics Platform',
        tint: '#9d1049',   /* crimson — heartbeats and biosignals */
        ink: '#8a0e40',
        category: 'swe',
        lang: 'python',
        tech: 'Python, FastAPI, DuckDB, Pydantic',
        tagline: 'Signal Analytics API',
        mono: 'PS',
        links: [
            { label: 'API', url: 'https://github.com/magana272/popanedb-backend' },
            { label: 'Library', url: 'https://github.com/magana272/POPANEpy' }
        ],
        description: 'Query, filter, and run PCA, FFT, and spectral analyses over physiological signals through one API.',
        cover: 'static/media/img/PhysiologicalSignalAnalyticsPlatform/emotions.png',
        fit: 'contain',
        mediaBg: '#111214',
        media: ['static/media/img/PhysiologicalSignalAnalyticsPlatform/emotions.png'],
        deepDive: true
    }),
    new Project({
        name: 'Paxos Key-Value Store',
        tint: '#0b5e63',   /* deep teal — steady under failure */
        ink: '#0a5257',
        category: 'swe',
        lang: 'java',
        tech: 'Java, RPC, Paxos',
        tagline: 'Consensus KV Store',
        mono: 'Px',
        links: [{ label: 'GitHub', url: 'https://github.com/magana272/PAXOS-Key-Value-Store' }],
        description: 'A key-value store that stays consistent even when nodes crash.',
        cover: 'static/media/img/paxos/paxos.png',
        fit: 'contain',
        media: ['static/media/img/paxos/paxos.png'],
        deepDive: true
    }),
    new Project({
        name: 'Cell Type Classification from scRNA-seq',
        tint: '#8a1a86',   /* vivid plum — stained cells under a scope */
        ink: '#781575',
        category: 'ml',
        lang: 'python',
        tech: 'Python, PyTorch, NumPy, Pandas',
        tagline: 'scRNA-seq Classifier',
        mono: 'CT',
        links: [{ label: 'GitHub', url: 'https://github.com/magana272/Cell-Type-Classification' }],
        description: 'Classify cell types from single-cell RNA-seq, benchmarked against published annotation methods.',
        cover: 'static/media/img/celltypeClass/fig_mpan_results.png',
        fit: 'contain',
        media: ['static/media/img/celltypeClass/fig_mpan_results.png'],
        deepDive: true
    }),
    new Project({
        name: 'Emotion Recognition from Physiological Signals',
        tint: '#8a5407',   /* golden bronze — warmth and emotion */
        ink: '#7a4a06',
        category: 'ml',
        lang: 'python',
        tech: 'Python, TensorFlow/Keras, scikit-learn',
        tagline: 'Biosignal Emotion ML',
        mono: 'ER',
        links: [],
        description: 'Can your heartbeat reveal how you feel? Detecting emotion from biosignals.',
        cover: 'static/media/img/PhysioSignals.png',
        fit: 'contain',
        mediaBg: '#111214',
        media: ['static/media/img/PhysioSignals.png'],
        deepDive: true
    })
];
