/* ============================================
   Sidebar — clock, uptime, command counter
   ============================================ */

class Sidebar {
    constructor(sessionStart) {
        this.sessionStart = sessionStart;
        this._clockEl  = document.getElementById('sidebar-clock');
        this._uptimeEl = document.getElementById('sidebar-uptime');
        this._cmdsEl   = document.getElementById('sidebar-cmds');
        this._count    = 0;
    }

    init() {
        this.update();
        setInterval(() => this.update(), 1000);
    }

    update() {
        if (this._clockEl) {
            this._clockEl.textContent = new Date()
                .toLocaleTimeString('en-US', { hour12: false });
        }
        if (this._uptimeEl) {
            const sec = Math.floor((Date.now() - this.sessionStart) / 1000);
            this._uptimeEl.textContent =
                Math.floor(sec / 60) + 'm ' + (sec % 60) + 's';
        }
    }

    bumpCmdCount() {
        this._count++;
        if (this._cmdsEl) this._cmdsEl.textContent = this._count;
    }
}
