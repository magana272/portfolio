/* ============================================
   Commands — all terminal command handlers
   ============================================ */

class Commands {
    /**
     * @param {Terminal} terminal - set after construction to break circular dep
     * @param {Spotify}  spotify
     */
    constructor(terminal, spotify) {
        this.t       = terminal;
        this.spotify = spotify;

        this.registry = {
            '/about':      () => CONFIG.about,
            '/experience': () => CONFIG.experience,
            '/projects':   () => CONFIG.projects,
            '/skills':     () => CONFIG.skills,
            '/resume':     () => CONFIG.resume,
            '/contact':    () => CONFIG.contact,
            '/help':       () => this.help(),
            '/whoami':     () => this.whoami(),
            '/ls':         () => this.ls(),
            '/pwd':        () => this.pwd(),
            '/cat':        () => this.cat(),
            '/spotify':    () => this._spotifyAsync(),
            '/clear':      null, // handled by Terminal
        };
    }

    // ── Static Commands ──────────────────────

    help() {
        return [
            '<span class="heading">─── Commands ───────────────────────────────</span>',
            '',
            '  <span class="accent">/about</span>        <span class="secondary">Background &amp; links</span>',
            '  <span class="accent">/experience</span>   <span class="secondary">Work history</span>',
            '  <span class="accent">/projects</span>     <span class="secondary">What I\'ve built</span>',
            '  <span class="accent">/skills</span>       <span class="secondary">Tech stack</span>',
            '  <span class="accent">/resume</span>       <span class="secondary">Education &amp; publications</span>',
            '  <span class="accent">/contact</span>      <span class="secondary">Get in touch</span>',
            '  <span class="accent">/spotify</span>      <span class="secondary">Recently played</span>',
            '  <span class="accent">/clear</span>        <span class="secondary">Clear the terminal</span>',
            '',
            '  <span class="dim">Also try: whoami  ls  pwd  echo [text]</span>',
        ];
    }

    whoami() {
        return ['manuel'];
    }

    ls() {
        return [
            '<span class="dim">total 8</span>',
            '',
            '<span class="accent-cyan">drwxr-xr-x</span>  <span class="secondary">about/</span>',
            '<span class="accent-cyan">drwxr-xr-x</span>  <span class="secondary">experience/</span>',
            '<span class="accent-cyan">drwxr-xr-x</span>  <span class="secondary">projects/</span>',
            '<span class="accent-cyan">drwxr-xr-x</span>  <span class="secondary">skills/</span>',
            '<span class="accent-cyan">drwxr-xr-x</span>  <span class="secondary">contact/</span>',
            '<span class="accent-cyan">drwxr-xr-x</span>  <span class="secondary">spotify/</span>',
            '<span class="highlight">-r--r--r--</span>  <span class="secondary">resume.pdf</span>',
            '<span class="highlight">-r--r--r--</span>  <span class="secondary">README.md</span>',
        ];
    }

    pwd() {
        return ['<span class="secondary">/home/manuel/portfolio</span>'];
    }

    cat() {
        return [
            '  <span class="dim">  /\\_/\\  </span>',
            '  <span class="accent"> ( o.o ) </span>',
            '  <span class="dim">  > ^ <  </span>',
        ];
    }

    // ── Spotify (async) ──────────────────────

    /** Returns a Promise — Terminal.processCmd handles the async case. */
    _spotifyAsync() {
        return this._fetchSpotify();
    }

    async _fetchSpotify() {
        const d = t => `<span class="dim">${t}</span>`;

        if (!this.spotify.isConfigured()) {
            return [
                '<span class="heading">─── Spotify ────────────────────────────────</span>',
                '',
                '  <span class="error">Not configured.</span>',
                '  ' + d('Add your Client ID to js/config.js to enable Spotify.'),
            ];
        }

        if (!this.spotify.isAuthorized()) {
            // Render auth prompt directly so we can attach a click handler
            this.t.addLine('<span class="heading">─── Spotify ────────────────────────────────</span>');
            this.t.addLine('');
            this.t.addLine('  ' + d('Not connected to Spotify.'));
            this.t.addLine('  ' + d('Authorize below to see recently played tracks:'));
            this.t.addLine('');

            const btn = document.createElement('div');
            btn.className = 'output-line';
            btn.innerHTML =
                '  <span class="accent">[</span>' +
                ' <a class="output-link" href="#" id="spotify-auth-btn">Connect Spotify</a>' +
                ' <span class="accent">]</span>';
            this.t._body.appendChild(btn);
            this.t.scrollBottom();

            document.getElementById('spotify-auth-btn')
                .addEventListener('click', e => {
                    e.preventDefault();
                    this.spotify.authorize();
                });

            return null; // already rendered
        }

        // Authorized — fetch live data
        this.t.addLine('  ' + d('fetching recently played...'));

        try {
            const data  = await this.spotify.recentlyPlayed();
            return this.spotify.formatRecentlyPlayed(data);
        } catch (err) {
            return ['<span class="error">Spotify: ' + err.message + '</span>'];
        }
    }
}
