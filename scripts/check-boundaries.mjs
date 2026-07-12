// Import-boundary check for the pages/features/shared tier rules (see
// handoff.md). Tiers point downward only:
//
//   pages    → features | components/shared | content | lib | pages
//   content  → features | components/shared | content | lib   (it constructs
//              the model classes it holds data for)
//   features → components/shared | content | lib — and never ANOTHER feature
//   shared   → lib
//   lib      → lib
//
// Also fails on any relative import that doesn't resolve to a file — in a
// buildless site that's a runtime 404. Run via `npm test` (pretest) or
// directly: node scripts/check-boundaries.mjs
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve, dirname, relative } from 'node:path';

const ROOT = process.cwd();
const SCAN = ['lib', 'content', 'components', 'features', 'pages'];

const ALLOWED = {
    lib: ['lib'],
    shared: ['lib'],
    features: ['shared', 'content', 'lib', 'features'], // same-feature only, checked below
    content: ['features', 'shared', 'content', 'lib'],
    pages: ['pages', 'features', 'shared', 'content', 'lib']
};

function tierOf(relPath) {
    const p = relPath.split('\\').join('/');
    if (p.startsWith('lib/')) return 'lib';
    if (p.startsWith('components/shared/')) return 'shared';
    if (p.startsWith('components/')) return 'components-other';
    if (p.startsWith('features/')) return 'features';
    if (p.startsWith('content/')) return 'content';
    if (p.startsWith('pages/')) return 'pages';
    return null;
}

function featureOf(relPath) {
    const m = /^features\/([^/]+)\//.exec(relPath.split('\\').join('/'));
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
        errors.push(rel + ': components/ may only contain shared/ — feature code belongs in features/');
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
        } else if (tier === 'features' && targetTier === 'features' &&
                   featureOf(rel) !== featureOf(relTarget)) {
            errors.push(rel + ': cross-feature import of ' + relTarget + ' — promote shared code to components/shared/');
        }
    }
}

if (errors.length) {
    console.error('Import boundary violations:\n  ' + errors.join('\n  '));
    process.exit(1);
}
console.log('Boundaries OK: ' + files.length + ' modules checked.');
