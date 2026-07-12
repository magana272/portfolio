// Full-page screenshots of the home page and all eight deep dives, compared
// against the pre-refactor baselines. Videos are masked (frames are
// nondeterministic); fonts are awaited so text renders identically.
const { test, expect } = require('@playwright/test');
const { SLUGS, ddUrl } = require('./helpers');

// Videos are pure nondeterminism for screenshots: their elements resize when
// metadata arrives, and media requests don't count toward networkidle. Abort
// them — the masks below cover whatever box remains.
test.beforeEach(async ({ page }) => {
    await page.route('**/*.{webm,mp4,mov}', function (route) { return route.abort(); });
});

async function settle(page) {
    await page.waitForLoadState('networkidle');
    await page.evaluate(function () { return document.fonts.ready; });
    // Layout depends on image dimensions; a late or dropped image shifts
    // everything below it. Wait for every in-flight img to finish (lazy
    // below-fold images never start without scrolling — skip them via the
    // timeout race), then fail loudly on any broken one rather than diffing a
    // silently shifted page.
    await page.evaluate(function () {
        var waits = Array.prototype.map.call(document.images, function (img) {
            if (img.complete) return null;
            return new Promise(function (resolve) {
                img.addEventListener('load', resolve, { once: true });
                img.addEventListener('error', resolve, { once: true });
            });
        });
        var timeout = new Promise(function (resolve) { setTimeout(resolve, 5000); });
        return Promise.race([Promise.all(waits), timeout]);
    });
    const broken = await page.evaluate(function () {
        return Array.prototype.filter.call(document.images, function (img) {
            return img.complete && img.naturalWidth === 0 && img.getAttribute('src');
        }).map(function (img) { return img.currentSrc || img.src; });
    });
    if (broken.length) throw new Error('Broken images: ' + broken.join(', '));
}

test('home page', async ({ page }) => {
    await page.goto('/');
    await settle(page);
    await expect(page).toHaveScreenshot('home.png', {
        fullPage: true,
        mask: [page.locator('video')]
    });
});

for (const slug of SLUGS) {
    test('deep dive: ' + slug, async ({ page }) => {
        await page.goto(ddUrl(slug));
        await settle(page);
        await expect(page).toHaveScreenshot('dd-' + slug + '.png', {
            fullPage: true,
            mask: [page.locator('video')]
        });
    });
}
