/* ============================================
   Terminal — rendering, input, boot, welcome
   ============================================ */

class Terminal {
    /**
     * @param {Commands} commands
     * @param {Sidebar}  sidebar
     */
    constructor(commands, sidebar) {
        this.commands   = commands;
        this.sidebar    = sidebar;
        this._body      = document.getElementById('terminal-body');
        this._input     = document.getElementById('cmd-input');
        this._history   = [];
        this._histIdx   = -1;
        this.isTyping   = false;
    }

    // ── Rendering ────────────────────────────

    scrollBottom() {
        this._body.scrollTop = this._body.scrollHeight;
    }

    escapeHtml(str) {
        const el = document.createElement('span');
        el.textContent = str;
        return el.innerHTML;
    }

    addLine(html) {
        const div = document.createElement('div');
        div.className = 'output-line';
        div.innerHTML = html;
        this._body.appendChild(div);
        this.scrollBottom();
    }

    typeLines(lines, onDone, delay) {
        if (!Array.isArray(lines)) return;
        const ms = delay !== undefined ? delay : 18;
        this.isTyping = true;
        let i = 0;

        const next = () => {
            if (i >= lines.length) {
                this.isTyping = false;
                this.scrollBottom();
                if (onDone) onDone();
                return;
            }

            const div = document.createElement('div');
            div.className = 'output-line';

            if (lines[i] === '') {
                div.innerHTML = '&nbsp;';
                div.className += ' output-spacer';
            } else {
                div.innerHTML = lines[i];
            }

            this._body.appendChild(div);
            this.scrollBottom();
            i++;
            setTimeout(next, ms);
        };

        next();
    }

    echoCmd(text) {
        const div = document.createElement('div');
        div.className = 'output-line output-cmd';
        div.innerHTML =
            '<span class="prompt-echo">manuel@portfolio</span>' +
            '<span class="prompt-sep">:</span>' +
            '<span class="accent">~</span>' +
            '<span class="prompt-sep">$</span> ' +
            '<span class="cmd-text">' + this.escapeHtml(text) + '</span>';
        this._body.appendChild(div);
    }

    // ── Boot & Welcome ───────────────────────

    runBoot(onDone) {
        this.typeLines([
            '<span class="dim">[  0.000]</span> portfolio-os v1.0.0',
            '<span class="dim">[  0.021]</span> <span class="secondary">user</span> manuel  <span class="secondary">shell</span> bash  <span class="secondary">home</span> /home/manuel/portfolio',
            '<span class="dim">[  0.049]</span> terminal initialized  <span class="highlight">ready</span>',
            '',
        ], onDone, 60);
    }

    showWelcome(spotifyConnected) {
        const d  = t => `<span class="dim">${t}</span>`;
        const hi = t => `<span class="highlight">${t}</span>`;
        const sc = t => `<span class="secondary">${t}</span>`;
        const ac = t => `<span class="accent">${t}</span>`;

        // Mobile — simple list, box is too wide for narrow screens
        if (window.innerWidth < 768) {
            this.typeLines([
                hi('Manuel Magana'),
                d('────────────────────────────────────────'),
                sc('Software Engineer') + '  ' + d('·') + '  SF, CA  ' + d('·') + '  ' + hi('open to work'),
                d('MS CS Northeastern (2026)  ·  Genentech alum'),
                '',
                '  ' + ac('/about') + '       ' + sc('Background &amp; links'),
                '  ' + ac('/experience') + '  ' + sc('Work history'),
                '  ' + ac('/projects') + '    ' + sc("What I've built"),
                '  ' + ac('/skills') + '      ' + sc('Tech stack'),
                '  ' + ac('/resume') + '      ' + sc('Education'),
                '  ' + ac('/contact') + '     ' + sc('Get in touch'),
                '  ' + ac('/spotify') + '     ' + sc('Recently played'),
                '',
                d('↑↓ history  ·  tab: autocomplete  ·  ctrl+l: clear'),
            ], null, 12);

            if (spotifyConnected) {
                setTimeout(() => this._showSpotifyConnectedMsg(), 400);
            }
            return;
        }

        // Desktop — CSS border box (no character-counting needed)
        const L = c => `<div class="wb-l">${c || '&nbsp;'}</div>`;
        const R = c => `<div class="wb-r">${c || '&nbsp;'}</div>`;

        const leftCol = [
            L(''),
            L(hi('Manuel Magana')),
            L(d('─────────────')),
            L(sc('Software Engineer')),
            L(d('San Francisco, CA')),
            L(hi('open to work')),
            L(d('m.s. cs · northeastern · 2026')),
            L(d('b.a. neurobiology · berkeley · 2021')),
            L(''),
            L(d('/\\_/\\')),
            L(ac('( o.o )')),
            L(d('> ^ <')),
            L(''),
        ].join('');

        const rightCol = [
            R(''),
            R(ac('/about') + '      ' + sc('Background')),
            R(ac('/experience') + ' ' + sc('Work history')),
            R(ac('/projects') + '   ' + sc("What I've built")),
            R(ac('/skills') + '     ' + sc('Tech stack')),
            R(ac('/resume') + '     ' + sc('Education')),
            R(ac('/contact') + '    ' + sc('Get in touch')),
            R(ac('/spotify') + '    ' + sc('Now playing')),
            R(''),
            R(d('↑↓') + '  ' + d('history')),
            R(d('tab') + ' ' + d('autocomplete')),
            R(d('ctrl+l') + '  ' + d('clear')),
            R(''),
        ].join('');

        this.addLine(
            '<div class="wb">' +
                `<span class="wb-title">${d('─── Portfolio Terminal v1.0.0 ─')}</span>` +
                '<div class="wb-body">' +
                    `<div class="wb-col-l">${leftCol}</div>` +
                    `<div class="wb-col-r">${rightCol}</div>` +
                '</div>' +
            '</div>'
        );

        if (spotifyConnected) {
            setTimeout(() => this._showSpotifyConnectedMsg(), 100);
        }
    }

    _showSpotifyConnectedMsg() {
        this.addLine('');
        this.addLine(
            '<span class="highlight">✓ Spotify connected</span>' +
            ' <span class="dim">— run /spotify to see recently played</span>'
        );
    }

    // ── Command Processing ───────────────────

    processCmd(raw) {
        const trimmed = raw.trim();
        if (!trimmed || this.isTyping) return;

        this._history.push(trimmed);
        this._histIdx = this._history.length;

        const parts   = trimmed.split(/\s+/);
        let   cmdName = parts[0].toLowerCase();
        if (!cmdName.startsWith('/')) cmdName = '/' + cmdName;

        // /clear — wipe terminal, no echo
        if (cmdName === '/clear') {
            this._body.innerHTML = '';
            return;
        }

        // /echo — print remaining args
        if (cmdName === '/echo') {
            this.echoCmd(trimmed);
            const msg = parts.slice(1).join(' ');
            this.typeLines([msg ? this.escapeHtml(msg) : '']);
            this.sidebar.bumpCmdCount();
            return;
        }

        this.echoCmd(trimmed);

        const handler = this.commands.registry[cmdName];

        if (typeof handler === 'function') {
            this.sidebar.bumpCmdCount();
            const result = handler();

            if (result instanceof Promise) {
                this.isTyping = true;
                result.then(lines => {
                    if (Array.isArray(lines)) {
                        this.typeLines(lines);
                    } else {
                        // Command rendered itself (e.g. auth prompt)
                        this.isTyping = false;
                    }
                }).catch(err => {
                    this.addLine('<span class="error">' + this.escapeHtml(err.message) + '</span>');
                    this.isTyping = false;
                });
            } else if (Array.isArray(result)) {
                this.typeLines(result);
            }

        } else if (!(cmdName in this.commands.registry)) {
            const keys       = Object.keys(this.commands.registry).filter(c => c !== '/clear');
            const suggestion = keys.find(c => c.startsWith(cmdName))
                            || keys.find(c => cmdName.startsWith(c));

            this.addLine('<span class="error">command not found: ' + this.escapeHtml(parts[0]) + '</span>');
            if (suggestion) {
                this.addLine(`<span class="dim">Did you mean <span class="accent">${suggestion}</span>?</span>`);
            } else {
                this.addLine('<span class="dim">Type <span class="accent">/help</span> for available commands.</span>');
            }
        }
    }

    // ── Autocomplete ─────────────────────────

    autocomplete(value) {
        const val = value.trim().toLowerCase();
        if (!val) return null;

        const query   = val.startsWith('/') ? val : '/' + val;
        const cmds    = Object.keys(this.commands.registry);
        const matches = cmds.filter(c => c.startsWith(query));

        if (matches.length === 1) return matches[0];

        if (matches.length > 1) {
            this.echoCmd(value);
            this.addLine('<span class="dim">' + matches.join('  ') + '</span>');
            return null;
        }

        return null;
    }

    // ── Events ───────────────────────────────

    _bindEvents() {
        this._input.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                const val = this._input.value;
                this._input.value = '';
                this.processCmd(val);
                return;
            }

            if (e.key === 'Tab') {
                e.preventDefault();
                const result = this.autocomplete(this._input.value);
                if (result) this._input.value = result;
                return;
            }

            if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (!this._history.length) return;
                if (this._histIdx > 0) this._histIdx--;
                this._input.value = this._history[this._histIdx] || '';
                return;
            }

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (this._histIdx < this._history.length - 1) {
                    this._histIdx++;
                    this._input.value = this._history[this._histIdx] || '';
                } else {
                    this._histIdx = this._history.length;
                    this._input.value = '';
                }
                return;
            }

            if (e.key === 'l' && e.ctrlKey) {
                e.preventDefault();
                this._body.innerHTML = '';
                return;
            }
        });

        document.querySelector('.terminal').addEventListener('click', e => {
            if (e.target.tagName !== 'A') this._input.focus();
        });
    }

    // ── Init ─────────────────────────────────

    init(spotifyConnected = false) {
        this._bindEvents();
        this._input.focus();
        this.runBoot(() => this.showWelcome(spotifyConnected));
    }
}
