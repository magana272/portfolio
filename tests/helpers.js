// Shared test constants. DD_PATH is the canonical deep-dive URL — the refactor
// moves it once (pages/project/project.html → pages/deep-dive/deep-dive.html),
// and updating it here retargets every spec. Screenshot names key off the slug
// so the visual baselines survive that move.
const DD_PATH = 'pages/project/project.html';

// Old public URLs that must keep resolving to the canonical page (via redirect
// stubs once the page moves).
const LEGACY_DD_PATHS = ['pages/project.html', 'pages/project/project.html'];

// Every project with a deep dive (content/projects.js all set deepDive: true).
const SLUGS = [
    'paypath',
    'dada-85',
    'trak',
    'whattodo',
    'physiological-signal-analytics-platform',
    'paxos-key-value-store',
    'cell-type-classification-from-scrna-seq',
    'emotion-recognition-from-physiological-signals'
];

function ddUrl(slug) {
    return DD_PATH + '?id=' + encodeURIComponent(slug);
}

module.exports = { DD_PATH, LEGACY_DD_PATHS, SLUGS, ddUrl };
