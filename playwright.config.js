// Playwright config for the refactor safety net. The site is buildless static
// files, so the web server is just python's http.server over the repo root.
// reducedMotion is forced on so the orb menu opens on a plain click (the
// hold-to-open gesture is pointer-timing dependent) and animations don't smear
// screenshots.
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: 'tests',
    fullyParallel: true,
    // Modest concurrency keeps the single static server comfortably ahead of
    // the browsers (deep-dive pages fetch a lot of media per page).
    workers: 4,
    webServer: {
        command: 'node scripts/serve.mjs 4173',
        port: 4173,
        reuseExistingServer: true
    },
    use: {
        baseURL: 'http://127.0.0.1:4173/',
        reducedMotion: 'reduce',
        viewport: { width: 1280, height: 720 }
    },
    expect: {
        timeout: 15000,
        toHaveScreenshot: { animations: 'disabled', maxDiffPixels: 100 }
    },
    projects: [{ name: 'chromium', use: { browserName: 'chromium' } }]
});
