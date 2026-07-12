// Import-boundary check for the pages/sections/shared tier rules (see
// handoff.md). Tiers point downward only:
//
//   pages    → components/section | components/shared | content | lib | pages
//   content  → components/section | components/shared | content | lib   (it
//              constructs the model classes it holds data for)
//   section  → lib — one dir per page section; a section may import the
//              Section primitive (components/section/section.js) but never
//              ANOTHER section's directory
//   shared   → lib
//   lib      → lib
//
// Also fails on any relative import that doesn't resolve to a file — in a
// buildless site that's a runtime 404. Run via `npm test` (pretest) or
// directly: node scripts/check-boundaries.mjs
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve, dirname, relative } from 'node:path';

const ROOT = process.cwd();
const SCAN = ['lib', 'content', 'components', 'features', 'pages'].filter(function (d) {
    return existsSync(join(ROOT, d));
});

const ALLOWED = {
    lib: ['lib'],
    shared: ['lib'],
    section: ['section', 'lib'], // same-section / tier-root only, checked below
    features: ['section', 'shared', 'content', 'lib'],
    content: ['section', 'features', 'shared', 'content', 'lib'],
    pages: ['pages', 'section', 'features', 'shared', 'content', 'lib']
};

function tierOf(relPath) {
    const p = relPath.split('\\').join('/');
    if (p.startsWith('lib/')) return 'lib';
    if (p.startsWith('components/shared/')) return 'shared';
    if (p.startsWith('components/section/')) return 'section';
    if (p.startsWith('components/')) return 'components-other';
    if (p.startsWith('features/')) return 'features';
    if (p.startsWith('content/')) return 'content';
    if (p.startsWith('pages/')) return 'pages';
    return null;
}

// The <name>-section directory a file belongs to, or null for tier-root files
// like the Section primitive itself.
function sectionDirOf(relPath) {
    const m = /^components\/section\/([^/]+)\//.exec(relPath.split('\\').join('/'));
    return m ? m[1] : null;
}

function walk(dir, out) {
    for (const name of readdirSync(dir)) {
        const full = join(dir, name);
        if (statSync(full).isDirectory()) walk(full, out);
        else if (name.endsWith('.js')) out.push(full);
    }
    return out;
}

const files = SCAN.flatMap(function (d) { return walk(join(ROOT, d), []); });
const errors = [];

for (const file of files) {
    const rel = relative(ROOT, file);
    const tier = tierOf(rel);
    if (tier === 'components-other') {
        errors.push(rel + ': components/ may only contain shared/ and section/');
        continue;
    }
    const src = readFileSync(file, 'utf8');
    const importRe = /^\s*import\s[^'"]*['"]([^'"]+)['"]/gm;
    let m;
    while ((m = importRe.exec(src))) {
        const spec = m[1];
        if (!spec.startsWith('.')) continue;
        const target = resolve(dirname(file), spec);
        const relTarget = relative(ROOT, target);
        let exists = true;
        try { statSync(target); } catch { exists = false; }
        if (!exists) {
            errors.push(rel + ': import "' + spec + '" does not resolve (' + relTarget + ')');
            continue;
        }
        const targetTier = tierOf(relTarget);
        if (!targetTier || !ALLOWED[tier].includes(targetTier)) {
            errors.push(rel + ' (' + tier + ') may not import ' + relTarget + ' (' + targetTier + ')');
        } else if (tier === 'section' && targetTier === 'section') {
            const from = sectionDirOf(rel);
            const to = sectionDirOf(relTarget);
            if (to && to !== from) {
                errors.push(rel + ': cross-section import of ' + relTarget + ' — promote shared code to components/shared/ or lib/');
            }
        }
    }
}

if (errors.length) {
    console.error('Import boundary violations:\n  ' + errors.join('\n  '));
    process.exit(1);
}
console.log('Boundaries OK: ' + files.length + ' modules checked.');
