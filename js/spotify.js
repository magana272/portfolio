/* ============================================
   Spotify — PKCE OAuth (no backend required)
   Uses Authorization Code + PKCE flow so no
   client secret is ever exposed.
   ============================================ */

class Spotify {
    constructor(clientId) {
        this.clientId     = clientId;
        this.scopes       = 'user-read-recently-played';
        this.redirectUri  = window.location.origin + window.location.pathname;
        this._tokenKey    = 'pf_spotify_token';
        this._verifierKey = 'pf_spotify_verifier';
    }

    // ── Token Storage ────────────────────────

    _loadToken() {
        try { return JSON.parse(localStorage.getItem(this._tokenKey)); }
        catch { return null; }
    }

    _saveToken(data, existingRefreshToken) {
        localStorage.setItem(this._tokenKey, JSON.stringify({
            access_token:  data.access_token,
            refresh_token: data.refresh_token || existingRefreshToken || null,
            expires_at:    Date.now() + data.expires_in * 1000,
        }));
    }

    get accessToken() {
        const t = this._loadToken();
        if (!t || Date.now() >= t.expires_at) return null;
        return t.access_token;
    }

    isConfigured() { return !!this.clientId; }
    isAuthorized() { return !!this.accessToken; }

    logout() {
        localStorage.removeItem(this._tokenKey);
        sessionStorage.removeItem(this._verifierKey);
    }

    // ── PKCE Helpers ─────────────────────────

    async _generateVerifier() {
        const arr = new Uint8Array(64);
        crypto.getRandomValues(arr);
        return btoa(String.fromCharCode(...arr))
            .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    }

    async _generateChallenge(verifier) {
        const buf = await crypto.subtle.digest(
            'SHA-256', new TextEncoder().encode(verifier)
        );
        return btoa(String.fromCharCode(...new Uint8Array(buf)))
            .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    }

    // ── Authorization ────────────────────────

    async authorize() {
        const verifier  = await this._generateVerifier();
        const challenge = await this._generateChallenge(verifier);
        sessionStorage.setItem(this._verifierKey, verifier);

        const params = new URLSearchParams({
            client_id:             this.clientId,
            response_type:         'code',
            redirect_uri:          this.redirectUri,
            scope:                 this.scopes,
            code_challenge_method: 'S256',
            code_challenge:        challenge,
        });

        window.location.href = 'https://accounts.spotify.com/authorize?' + params;
    }

    async exchangeCode(code) {
        const verifier = sessionStorage.getItem(this._verifierKey);
        if (!verifier) throw new Error('verifier missing — try connecting again');

        const res = await fetch('https://accounts.spotify.com/api/token', {
            method:  'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id:     this.clientId,
                grant_type:    'authorization_code',
                code,
                redirect_uri:  this.redirectUri,
                code_verifier: verifier,
            }),
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.error_description || 'token exchange failed');
        }

        const data = await res.json();
        this._saveToken(data);
        sessionStorage.removeItem(this._verifierKey);
        window.history.replaceState({}, '', window.location.pathname);
    }

    async _refresh() {
        const t = this._loadToken();
        if (!t?.refresh_token) return false;

        const res = await fetch('https://accounts.spotify.com/api/token', {
            method:  'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id:     this.clientId,
                grant_type:    'refresh_token',
                refresh_token: t.refresh_token,
            }),
        });

        if (!res.ok) return false;
        const data = await res.json();
        this._saveToken(data, t.refresh_token);
        return true;
    }

    async getValidToken() {
        if (this.accessToken) return this.accessToken;
        const ok = await this._refresh();
        return ok ? this.accessToken : null;
    }

    // ── OAuth Callback ───────────────────────

    /** Call on page load — returns true if a Spotify code was handled. */
    async handleCallbackIfNeeded() {
        if (!this.clientId) return false;
        const code = new URLSearchParams(window.location.search).get('code');
        if (!code) return false;
        await this.exchangeCode(code);
        return true;
    }

    // ── API ──────────────────────────────────

    async recentlyPlayed(limit = 8) {
        const token = await this.getValidToken();
        if (!token) throw new Error('not authorized');

        const res = await fetch(
            `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
            { headers: { Authorization: 'Bearer ' + token } }
        );

        if (res.status === 401) {
            this.logout();
            throw new Error('session expired — run /spotify to reconnect');
        }
        if (!res.ok) throw new Error('Spotify API error ' + res.status);
        return res.json();
    }

    // ── Formatting ───────────────────────────

    formatRecentlyPlayed(data) {
        const d  = t => `<span class="dim">${t}</span>`;
        const sc = t => `<span class="secondary">${t}</span>`;
        const hi = t => `<span class="highlight">${t}</span>`;
        const ac = t => `<span class="accent">${t}</span>`;

        const lines = [
            ac('─── Recently Played ──────────────────────'),
            '',
        ];

        const seen = new Set();
        let count = 0;

        for (const item of data.items) {
            if (count >= 5) break;

            const track   = item.track;
            const key     = track.name + '|' + track.artists[0].name;
            if (seen.has(key)) continue;
            seen.add(key);
            count++;

            const artists = track.artists.map(a => a.name).join(', ');
            const album   = track.album.name;
            const ago     = this._timeAgo(new Date(item.played_at));

            lines.push(
                `  ${hi('▶')} ${sc(track.name)}`,
                `     ${d(artists + ' · ' + album)}`,
                `     ${d(ago)}`,
                '',
            );
        }

        if (count === 0) {
            lines.push('  ' + d('No recent tracks found.'));
        }

        return lines;
    }

    _timeAgo(date) {
        const s = Math.floor((Date.now() - date) / 1000);
        if (s < 60)    return 'just now';
        if (s < 3600)  return Math.floor(s / 60) + 'm ago';
        if (s < 86400) return Math.floor(s / 3600) + 'h ago';
        return Math.floor(s / 86400) + 'd ago';
    }
}
