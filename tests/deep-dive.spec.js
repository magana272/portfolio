// Deep-dive smoke tests: every slug renders its case study, the title and orb
// theme follow the project, the back link returns home, and a bad slug shows
// the not-found notice.
const { test, expect } = require('@playwright/test');
const { SLUGS, ddUrl } = require('./helpers');

// Nothing here asserts on media, and parallel video streaming can starve the
// single test server. Abort video requests.
test.beforeEach(async ({ page }) => {
    await page.route('**/*.{webm,mp4,mov}', function (route) { return route.abort(); });
});

for (const slug of SLUGS) {
    test('renders ' + slug, async ({ page }) => {
        // domcontentloaded: the page module runs before DCL, and waiting on
        // full 'load' makes large case-study media a flake source. The
        // assertions below poll for anything async.
        await page.goto(ddUrl(slug), { waitUntil: 'domcontentloaded' });
        await expect(page.locator('#deep-dive > *').first()).toBeAttached();
        await expect(page).toHaveTitle(/Deep Dive/);
        // onNavReady() washes the orb in the project's theme.
        await expect.poll(function () {
            return page.evaluate(function () {
                return document.documentElement.style.getPropertyValue('--orb-bg');
            });
        }).not.toBe('');
    });
}

test('back link returns to the home projects band', async ({ page }) => {
    await page.goto(ddUrl('paypath'), { waitUntil: 'domcontentloaded' });
    // <base href="../../"> makes the shell's #projects-section href resolve to
    // the site root, i.e. back to the home page.
    await page.locator('.dd-back').first().click();
    await expect(page).toHaveURL(/\/#projects-section$/);
    await expect(page.locator('#work > *').first()).toBeAttached();
});

test('unknown slug shows the not-found notice', async ({ page }) => {
    await page.goto(ddUrl('does-not-exist'), { waitUntil: 'domcontentloaded' });
    await expect(page.locator('.dd-notfound')).toBeVisible();
    await expect(page).toHaveTitle(/not found/i);
});
