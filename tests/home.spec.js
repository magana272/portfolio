// Home page smoke tests: the section shells are present in order and get
// their content mounted, the orb menu opens and navigates, and the scroll spy
// rethemes the orb per band.
const { test, expect } = require('@playwright/test');

const SECTION_ORDER = [
    'about', 'projects-section', 'experience-section', 'education', 'skills',
    'about-me', 'photography', 'jiujitsu', 'listening'
];

test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
});

test('sections appear in document order', async ({ page }) => {
    const inOrder = await page.evaluate(function (ids) {
        var els = ids.map(function (id) { return document.getElementById(id); });
        if (els.some(function (el) { return !el; })) return false;
        for (var i = 0; i < els.length - 1; i++) {
            if (!(els[i].compareDocumentPosition(els[i + 1]) & Node.DOCUMENT_POSITION_FOLLOWING)) {
                return false;
            }
        }
        return true;
    }, SECTION_ORDER);
    expect(inOrder).toBe(true);
});

test('every shell gets its content mounted', async ({ page }) => {
    await expect(page.locator('#work > *')).toHaveCount(8);       // one panel per project
    await expect(page.locator('#experience > *')).toHaveCount(3); // one band per role
    for (const id of ['education', 'skills', 'about-me', 'jiujitsu', 'listening']) {
        await expect(page.locator('#' + id + ' > *').first()).toBeAttached();
    }
    await expect(page.locator('#photo-mosaic > *').first()).toBeAttached();
});

test('orb menu opens and a link navigates', async ({ page }) => {
    // Keyboard activation: a synthetic mouse click rides the hold-to-open
    // pointer path and gets suppressed as an aborted hold; Enter takes the
    // designed keyboard toggle.
    await page.locator('.nav-orb').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.nav-overlay')).toHaveClass(/is-open/);
    await expect(page.locator('.nav-orb')).toHaveAttribute('aria-expanded', 'true');

    await page.locator('.nav-menu-links a', { hasText: 'Experience' }).first().click();
    await expect(page).toHaveURL(/#experience-section$/);
    await expect(page.locator('.nav-overlay')).not.toHaveClass(/is-open/);
});

test('scroll spy rethemes the orb per band', async ({ page }) => {
    const orbBg = function () {
        return page.evaluate(function () {
            return document.documentElement.style.getPropertyValue('--orb-bg');
        });
    };
    await expect.poll(orbBg).not.toBe(''); // About band theme applied on load

    const initial = await orbBg();
    await page.evaluate(function () {
        var el = document.getElementById('work-paypath');
        el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await expect.poll(orbBg).not.toBe(initial); // project band wears its own theme
});

test('no console errors on load and scroll', async ({ page }) => {
    const errors = [];
    page.on('console', function (msg) { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', function (err) { errors.push(String(err)); });
    await page.reload({ waitUntil: 'networkidle' });
    await page.evaluate(function () {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
    });
    await page.waitForTimeout(500);
    expect(errors).toEqual([]);
});
