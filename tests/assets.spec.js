// Every import in this codebase is a literal relative path (ES modules, CSS
// @imports, data-include partials), so a missed path after a file move is a
// silent 404. This spec fails loudly on any local response >= 400.
const { test, expect } = require('@playwright/test');
const { ddUrl } = require('./helpers');

async function badResponses(page, url) {
    const bad = [];
    page.on('response', function (res) {
        if (res.status() >= 400 && res.url().includes('127.0.0.1:4173')) {
            bad.push(res.status() + ' ' + res.url());
        }
    });
    await page.goto(url, { waitUntil: 'networkidle' });
    return bad;
}

test('home page loads every asset', async ({ page }) => {
    expect(await badResponses(page, '/')).toEqual([]);
});

test('deep-dive page loads every asset', async ({ page }) => {
    expect(await badResponses(page, ddUrl('paypath'))).toEqual([]);
});
