// SECTIONTHEME explicitness check (see lib/theme.js). Every entry must fill
// every key of its groups — sections carry orb + band, projects (entries
// with a dd group or a band.pink) also carry a full dd tone set and pink.
// Unknown or wrong-case keys (inksoft vs inkSoft) fail loudly: the bridge
// matches keys exactly, so a typo is otherwise a silent no-op.
// Runs as part of npm test (pretest) or directly:
// node scripts/check-theme.mjs
import { SECTIONTHEME } from '../lib/theme.js';

const ORB = ['flood', 'ink', 'hot', 'hover', 'active'];
const BAND = ['accent', 'ink', 'inkMid', 'inkSoft', 'line'];
const BAND_PROJECT = [...BAND, 'pink'];
const DD_TONES = ['accent', 'ink', 'inkMid', 'inkSoft', 'line', 'surface'];
const DD_ELEMENTS = ['heroInk', 'eyebrowInk', 'labelInk', 'headingInk', 'headingNum', 'noteAccent', 'copyInk'];

const errors = [];

function checkGroup(name, group, obj, required, optional = []) {
    for (const key of required) {
        if (!obj || !obj[key]) errors.push(`${name}: ${group}.${key} missing — every key must be explicit`);
    }
    for (const key of Object.keys(obj || {})) {
        if (!required.includes(key) && !optional.includes(key)) {
            errors.push(`${name}: unknown key ${group}.${key} (check spelling/case — the bridge ignores it)`);
        }
    }
}

for (const [name, theme] of Object.entries(SECTIONTHEME)) {
    const isProject = !!(theme.dd || (theme.band && theme.band.pink));
    for (const key of Object.keys(theme)) {
        if (!['orb', 'band', 'dd'].includes(key)) errors.push(`${name}: unknown group ${key}`);
    }
    checkGroup(name, 'orb', theme.orb, ORB);
    checkGroup(name, 'band', theme.band, isProject ? BAND_PROJECT : BAND);
    if (isProject) checkGroup(name, 'dd', theme.dd, DD_TONES, DD_ELEMENTS);
    else if (theme.dd) errors.push(`${name}: dd group on a non-project entry`);
}

if (errors.length) {
    console.error('SECTIONTHEME explicitness violations:\n  ' + errors.join('\n  '));
    process.exit(1);
}
console.log('SECTIONTHEME OK: ' + Object.keys(SECTIONTHEME).length + ' entries, all explicit.');
