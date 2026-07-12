// Old public deep-dive URLs must always land on the canonical page with the
// query string intact. Before the move the nested path IS canonical (the
// assertion is trivially true); after it, both paths go through redirect stubs.
const { test, expect } = require('@playwright/test');
const { DD_PATH, LEGACY_DD_PATHS } = require('./helpers');

for (const legacy of LEGACY_DD_PATHS) {
    test(legacy + ' resolves to the canonical deep dive', async ({ page }) => {
        await page.goto(legacy + '?id=paypath', { waitUntil: 'networkidle' });
        await expect(page).toHaveURL(new RegExp(DD_PATH.replace(/[./]/g, '\\$&') + '\\?id=paypath$'));
        await expect(page.locator('#deep-dive > *').first()).toBeAttached();
    });
}
