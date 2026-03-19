/* ============================================
   Portfolio Terminal — Script
   ============================================
   Edit CONFIG with your personal information.
   Each string is one line of terminal output.
   HTML span classes available for styling:
     .highlight     green bold
     .accent        blue
     .accent-cyan   cyan
     .heading       purple
     .dim           muted gray
     .secondary     light gray
     .error         red
     .output-link   blue link (use <a> tag)
   ============================================ */


// ── Configuration ──────────────────────────

const CONFIG = {
    name: 'Manuel',

    about: [
        '<span class="highlight">Manuel Magana</span>',
        '<span class="dim">─────────────────────────────────────────</span>',
        'Software Engineer with a background in neurobiology',
        'and bioinformatics, now building backend systems,',
        'distributed infrastructure, and developer tools.',
        '',
        '  <span class="secondary">&bull;</span> M.S. Computer Science @ Northeastern <span class="dim">(2026)</span>',
        '  <span class="secondary">&bull;</span> B.A. Neurobiology @ UC Berkeley <span class="dim">(2021)</span>',
        '  <span class="secondary">&bull;</span> Previously Bioinformatics Scientist @ Genentech',
        '  <span class="secondary">&bull;</span> Focused on scalable systems, data pipelines, and APIs',
        '',
        '  <span class="dim">github</span>    <a class="output-link" href="https://github.com/magana272" target="_blank" rel="noopener">github.com/magana272</a>',
        '  <span class="dim">linkedin</span>  <a class="output-link" href="https://linkedin.com/in/manuel-magana-359290160/" target="_blank" rel="noopener">linkedin.com/in/manuel-magana</a>',
        '  <span class="dim">email</span>     <a class="output-link" href="mailto:manuel.ramon.magana@gmail.com">manuel.ramon.magana@gmail.com</a>',
    ],

    experience: [
        '<span class="heading">─── Experience ─────────────────────────────</span>',
        '',
        '  <span class="highlight">&bull;</span> <span class="accent-cyan">Bioinformatics Scientist</span>',
        '    Genentech <span class="dim">&middot; Nov 2022 — Jul 2025 &middot; San Francisco, CA</span>',
        '',
        '    Designed a well-tested Python library integrated into',
        '    5 production pipelines, reducing manual review from',
        '    days to hours. Optimized PySpark ETL pipelines',
        '    processing 200GB+ mass spectrometry files &mdash;',
        '    partition tuning, broadcast joins, and Parquet caching',
        '    reduced batch runtime from hours to minutes.',
        '    Containerized pipelines with Docker for reproducible',
        '    execution across 3 research teams.',
        '',
        '  <span class="highlight">&bull;</span> <span class="accent-cyan">Research Technician</span>',
        '    Weill Cornell Medicine <span class="dim">&middot; Jan 2022 — Jul 2022 &middot; New York, NY</span>',
        '',
        '    Developed Python and Bash tooling for large-scale',
        '    biological sequence processing including FASTA parsing',
        '    and motif extraction. Managed reproducible research',
        '    workflows and multi-user compute environments.',
        '',
        '  <span class="highlight">&bull;</span> <span class="accent-cyan">Junior Data Scientist</span>',
        '    Endless West <span class="dim">&middot; Mar 2021 — Nov 2021 &middot; San Francisco, CA</span>',
        '',
        '    Built ML training pipelines for sensory attribute',
        '    prediction from chromatography data. Developed web',
        '    scrapers with BeautifulSoup to extract chemical',
        '    property data from public databases.',
    ],

    projects: [
        '<span class="heading">─── Projects ───────────────────────────────</span>',
        '',
        '  <span class="accent-cyan">&#9670; Physiological Signal Analytics Platform</span>',
        '    Two-layer analytics system: reusable Python ETL/analysis',
        '    library + production FastAPI REST service backed by DuckDB.',
        '    Low-latency endpoints for PCA, FFT, and spectral density.',
        '    <span class="dim">tech: Python, FastAPI, DuckDB, Pydantic</span>',
        '    <a class="output-link" href="https://github.com/magana272/popanedb-backend" target="_blank" rel="noopener">&rarr; API</a> &middot; <a class="output-link" href="https://github.com/magana272/POPANEpy" target="_blank" rel="noopener">&rarr; Library</a>',
        '',
        '  <span class="accent-cyan">&#9670; WhatToDo &mdash; AI Event Discovery Platform</span>',
        '    Dual-provider AI recommendation engine (Claude + GPT-4o)',
        '    with live web search. JWT auth, SQLAlchemy + AWS RDS,',
        '    deployed to App Runner via ECR with GitHub Actions CI/CD.',
        '    96% pytest coverage. Led backend for a 4-person team.',
        '    <span class="dim">tech: Python, FastAPI, Claude API, Docker, AWS</span>',
        '    <a class="output-link" href="https://bmjumiukye.us-east-1.awsapprunner.com/" target="_blank" rel="noopener">&rarr; Live</a>',
        '',
        '  <span class="accent-cyan">&#9670; Rate Limiter Service</span>',
        '    High-performance Go reverse proxy with fixed window and',
        '    token bucket rate limiting. Atomic Redis transactions',
        '    prevent race conditions under 1,000+ concurrent requests.',
        '    <span class="dim">tech: Go, Redis, Docker</span>',
        '    <a class="output-link" href="https://github.com/magana272/Rate-Limiter-Service" target="_blank" rel="noopener">&rarr; github.com/magana272/Rate-Limiter-Service</a>',
        '',
        '  <span class="accent-cyan">&#9670; Paxos Key-Value Store</span>',
        '    Fault-tolerant distributed KV store using Paxos consensus.',
        '    RPC-based node discovery, dynamic cluster joins, validated',
        '    under chaos testing with 10% acceptor failure rate.',
        '    <span class="dim">tech: Java, RPC</span>',
        '    <a class="output-link" href="https://github.com/magana272/PAXOS-Key-Value-Store" target="_blank" rel="noopener">&rarr; github.com/magana272/PAXOS-Key-Value-Store</a>',
    ],

    skills: [
        '<span class="heading">─── Skills ─────────────────────────────────</span>',
        '',
        '  <span class="secondary">Languages:</span>',
        '    Python  &middot;  Go  &middot;  Java  &middot;  SQL  &middot;  Bash  &middot;  C',
        '',
        '  <span class="secondary">Backend &amp; Infrastructure:</span>',
        '    FastAPI  &middot;  SQLAlchemy  &middot;  PySpark  &middot;  Docker',
        '    Redis  &middot;  AWS (RDS, App Runner, ECR)  &middot;  GitHub Actions',
        '',
        '  <span class="secondary">Data &amp; ML:</span>',
        '    DuckDB  &middot;  Parquet  &middot;  ETL pipelines',
        '    PyTorch  &middot;  pandas  &middot;  NumPy  &middot;  mass spec analysis',
        '',
        '  <span class="secondary">Tools:</span>',
        '    Git  &middot;  pytest  &middot;  Pydantic  &middot;  Anthropic Claude API',
    ],

    resume: [
        '<span class="heading">─── Resume ─────────────────────────────────</span>',
        '',
        '  <span class="secondary">Languages:</span>',
        '    Python, Java, SQL, Bash, C, Go',
        '',
        '  <span class="secondary">Frameworks &amp; Tools:</span>',
        '    FastAPI, SQLAlchemy, pytest, PySpark, PyTorch,',
        '    Docker, AWS, Redis, Git, Anthropic Claude API',
        '',
        '  <span class="secondary">Education:</span>',
        '    M.S. Computer Science',
        '    Northeastern University, San Jose <span class="dim">&middot; May 2026</span>',
        '',
        '    B.A. Molecular &amp; Cell Biology: Neurobiology',
        '    University of California, Berkeley <span class="dim">&middot; May 2021</span>',
        '',
        '  <span class="secondary">Publication:</span>',
        '    MSstats+ enhances differential analysis in',
        '    proteomic experiments <span class="dim">&middot; bioRxiv 2025</span>',
        '    <a class="output-link" href="https://doi.org/10.1101/2025.09.11.675573" target="_blank" rel="noopener">&rarr; doi:10.1101/2025.09.11.675573</a>',
    ],

    contact: [
        '<span class="heading">─── Contact ────────────────────────────────</span>',
        '',
        '  <span class="dim">email</span>     <a class="output-link" href="mailto:manuel.ramon.magana@gmail.com">manuel.ramon.magana@gmail.com</a>',
        '  <span class="dim">github</span>    <a class="output-link" href="https://github.com/magana272" target="_blank" rel="noopener">github.com/magana272</a>',
        '  <span class="dim">linkedin</span>  <a class="output-link" href="https://linkedin.com/in/manuel-magana-359290160/" target="_blank" rel="noopener">linkedin.com/in/manuel-magana</a>',
        '',
        '  <span class="secondary">Open to:</span>',
        '    Full-time engineering roles, contract work,',
        '    and interesting side projects.',
    ],
};


// ── DOM References ─────────────────────────

const body    = document.getElementById('terminal-body');
const input   = document.getElementById('cmd-input');
const modeEl  = document.getElementById('status-mode');


// ── State ──────────────────────────────────

const cmdHistory  = [];
let historyIdx    = -1;
let isTyping      = false;
let cmdCount      = 0;
const sessionStart = Date.now();


// ── Command Registry ───────────────────────

const COMMANDS = {
    '/about':      () => CONFIG.about,
    '/experience': () => CONFIG.experience,
    '/projects':   () => CONFIG.projects,
    '/skills':     () => CONFIG.skills,
    '/resume':     () => CONFIG.resume,
    '/contact':    () => CONFIG.contact,
    '/help':       cmdHelp,
    '/whoami':     cmdWhoami,
    '/ls':         cmdLs,
    '/pwd':        cmdPwd,
    '/cat':        cmdCat,
    '/clear':      null, // handled specially — no output, no echo
};

function cmdHelp() {
    return [
        '<span class="heading">─── Commands ───────────────────────────────</span>',
        '',
        '  <span class="accent">/about</span>        <span class="secondary">Background &amp; links</span>',
        '  <span class="accent">/experience</span>   <span class="secondary">Work history</span>',
        '  <span class="accent">/projects</span>     <span class="secondary">What I\'ve built</span>',
        '  <span class="accent">/skills</span>       <span class="secondary">Tech stack</span>',
        '  <span class="accent">/resume</span>       <span class="secondary">Education &amp; publications</span>',
        '  <span class="accent">/contact</span>      <span class="secondary">Get in touch</span>',
        '  <span class="accent">/clear</span>        <span class="secondary">Clear the terminal</span>',
        '',
        '  <span class="dim">Also try: whoami  ls  pwd  echo [text]</span>',
    ];
}

function cmdWhoami() {
    return ['manuel'];
}

function cmdLs() {
    return [
        '<span class="dim">total 7</span>',
        '',
        '<span class="accent-cyan">drwxr-xr-x</span>  <span class="secondary">about/</span>',
        '<span class="accent-cyan">drwxr-xr-x</span>  <span class="secondary">experience/</span>',
        '<span class="accent-cyan">drwxr-xr-x</span>  <span class="secondary">projects/</span>',
        '<span class="accent-cyan">drwxr-xr-x</span>  <span class="secondary">skills/</span>',
        '<span class="accent-cyan">drwxr-xr-x</span>  <span class="secondary">contact/</span>',
        '<span class="highlight">-r--r--r--</span>  <span class="secondary">resume.pdf</span>',
        '<span class="highlight">-r--r--r--</span>  <span class="secondary">README.md</span>',
    ];
}

function cmdCat() {
    return [
        '  <span class="dim">  /\\_/\\  </span>',
        '  <span class="accent"> ( o.o ) </span>',
        '  <span class="dim">  > ^ <  </span>',
    ];
}

function cmdPwd() {
    return ['<span class="secondary">/home/manuel/portfolio</span>'];
}


// ── Rendering ──────────────────────────────

/** Echo the typed command with a prompt prefix */
function echoCmd(text) {
    const div = document.createElement('div');
    div.className = 'output-line output-cmd';
    div.innerHTML =
        '<span class="prompt-echo">manuel@portfolio</span>' +
        '<span class="prompt-sep">:</span>' +
        '<span class="accent">~</span>' +
        '<span class="prompt-sep">$</span> ' +
        '<span class="cmd-text">' + escapeHtml(text) + '</span>';
    body.appendChild(div);
}

/**
 * Print lines one-by-one with a small delay (typing effect).
 * @param {string[]} lines   - HTML strings to render
 * @param {function} onDone  - Called after the last line
 * @param {number}   delay   - ms between each line (default 18)
 */
function typeLines(lines, onDone, delay) {
    const msPerLine = (delay !== undefined) ? delay : 18;
    isTyping = true;
    let i = 0;

    function next() {
        if (i >= lines.length) {
            isTyping = false;
            scrollBottom();
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

        body.appendChild(div);
        scrollBottom();
        i++;
        setTimeout(next, msPerLine);
    }

    next();
}

/** Add a single line instantly (no typing delay) */
function addLine(html) {
    const div = document.createElement('div');
    div.className = 'output-line';
    div.innerHTML = html;
    body.appendChild(div);
    scrollBottom();
}


// ── Boot Sequence ──────────────────────────

const BOOT_LINES = [
    '<span class="dim">[  0.000]</span> portfolio-os v1.0.0',
    '<span class="dim">[  0.021]</span> <span class="secondary">user</span> manuel  <span class="secondary">shell</span> bash  <span class="secondary">home</span> /home/manuel/portfolio',
    '<span class="dim">[  0.049]</span> terminal initialized  <span class="highlight">ready</span>',
    '',
];

function runBoot(onDone) {
    typeLines(BOOT_LINES, onDone, 60);
}


// ── Welcome Message ────────────────────────

function showWelcome() {
    var d  = function(t) { return '<span class="dim">' + t + '</span>'; };
    var hi = function(t) { return '<span class="highlight">' + t + '</span>'; };
    var sc = function(t) { return '<span class="secondary">' + t + '</span>'; };
    var ac = function(t) { return '<span class="accent">' + t + '</span>'; };
    // Mobile fallback — simple list, no box (too wide for narrow screens)
    if (window.innerWidth < 768) {
        typeLines([
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
            '',
            d('↑↓ history  ·  tab: autocomplete  ·  ctrl+l: clear'),
        ], null, 12);
        return;
    }

    // Desktop: CSS-border box — frame never relies on character counting.
    // The entire box is one HTML element so top/sides/bottom all align automatically.
    var L = function(content) {
        return '<div class="wb-l">' + (content || '&nbsp;') + '</div>';
    };
    var R = function(content) {
        return '<div class="wb-r">' + (content || '&nbsp;') + '</div>';
    };

    var leftCol = [
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

    var rightCol = [
        R(''),
        R(ac('/about') + '      ' + sc('Background')),
        R(ac('/experience') + ' ' + sc('Work history')),
        R(ac('/projects') + '   ' + sc("What I've built")),
        R(ac('/skills') + '     ' + sc('Tech stack')),
        R(ac('/resume') + '     ' + sc('Education')),
        R(ac('/contact') + '    ' + sc('Get in touch')),
        R(''),
        R(d('↑↓') + '  ' + d('history')),
        R(d('tab') + ' ' + d('autocomplete')),
        R(d('ctrl+l') + '  ' + d('clear')),
        R(''),
    ].join('');

    addLine(
        '<div class="wb">' +
            '<span class="wb-title">' + d('─── Portfolio Terminal v1.0.0 ─') + '</span>' +
            '<div class="wb-body">' +
                '<div class="wb-col-l">' + leftCol + '</div>' +
                '<div class="wb-col-r">' + rightCol + '</div>' +
            '</div>' +
        '</div>'
    );
}


// ── Command Processing ─────────────────────

function processCmd(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;
    if (isTyping) return;

    // Save to history
    cmdHistory.push(trimmed);
    historyIdx = cmdHistory.length;

    // Parse: extract command name (first word, normalized to /cmd)
    const parts   = trimmed.split(/\s+/);
    let cmdName   = parts[0].toLowerCase();
    if (!cmdName.startsWith('/')) cmdName = '/' + cmdName;

    // /clear — wipe terminal, skip echo
    if (cmdName === '/clear') {
        body.innerHTML = '';
        return;
    }

    // /echo — print remaining args as-is
    if (cmdName === '/echo') {
        echoCmd(trimmed);
        const msg = parts.slice(1).join(' ');
        typeLines([msg ? escapeHtml(msg) : ''], null, 18);
        bumpCmdCount();
        return;
    }

    echoCmd(trimmed);

    const handler = COMMANDS[cmdName];

    if (typeof handler === 'function') {
        bumpCmdCount();
        typeLines(handler(), null, 18);
    } else if (handler === null) {
        // Should be caught above; noop
    } else {
        // No direct match — try to suggest something close
        const keys = Object.keys(COMMANDS).filter(c => c !== '/clear');
        const suggestion =
            keys.find(c => c.startsWith(cmdName)) ||
            keys.find(c => cmdName.startsWith(c));

        addLine('<span class="error">command not found: ' + escapeHtml(parts[0]) + '</span>');
        if (suggestion) {
            addLine('<span class="dim">Did you mean <span class="accent">' + suggestion + '</span>?</span>');
        } else {
            addLine('<span class="dim">Type <span class="accent">/help</span> for available commands.</span>');
        }
    }
}

function bumpCmdCount() {
    cmdCount++;
    const el = document.getElementById('sidebar-cmds');
    if (el) el.textContent = cmdCount;
}


// ── Tab Autocomplete ───────────────────────

function autocomplete(value) {
    const val = value.trim().toLowerCase();
    if (!val) return null;

    const query   = val.startsWith('/') ? val : '/' + val;
    const cmds    = Object.keys(COMMANDS);
    const matches = cmds.filter(c => c.startsWith(query));

    if (matches.length === 1) {
        return matches[0];
    }

    if (matches.length > 1) {
        echoCmd(value);
        addLine('<span class="dim">' + matches.join('  ') + '</span>');
        return null;
    }

    return null;
}


// ── Sidebar: Clock + Uptime ─────────────────

function updateSidebar() {
    const now = new Date();

    const clockEl = document.getElementById('sidebar-clock');
    if (clockEl) {
        clockEl.textContent = now.toLocaleTimeString('en-US', { hour12: false });
    }

    const uptimeEl = document.getElementById('sidebar-uptime');
    if (uptimeEl) {
        const sec = Math.floor((Date.now() - sessionStart) / 1000);
        uptimeEl.textContent = Math.floor(sec / 60) + 'm ' + (sec % 60) + 's';
    }
}


// ── Event Handlers ─────────────────────────

input.addEventListener('keydown', function (e) {

    // Enter — run command
    if (e.key === 'Enter') {
        var val = input.value;
        input.value = '';
        processCmd(val);
        return;
    }

    // Tab — autocomplete
    if (e.key === 'Tab') {
        e.preventDefault();
        var result = autocomplete(input.value);
        if (result) input.value = result;
        return;
    }

    // Arrow Up — previous command
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (cmdHistory.length === 0) return;
        if (historyIdx > 0) historyIdx--;
        input.value = cmdHistory[historyIdx] || '';
        return;
    }

    // Arrow Down — next command
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIdx < cmdHistory.length - 1) {
            historyIdx++;
            input.value = cmdHistory[historyIdx] || '';
        } else {
            historyIdx = cmdHistory.length;
            input.value = '';
        }
        return;
    }

    // Ctrl+L — clear
    if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        body.innerHTML = '';
        return;
    }
});

// Click anywhere on the terminal to refocus input
document.querySelector('.terminal').addEventListener('click', function (e) {
    if (e.target.tagName !== 'A') {
        input.focus();
    }
});


// ── Utilities ──────────────────────────────

function scrollBottom() {
    body.scrollTop = body.scrollHeight;
}

function escapeHtml(str) {
    var el = document.createElement('span');
    el.textContent = str;
    return el.innerHTML;
}


// ── Initialize ─────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
    setInterval(updateSidebar, 1000);
    updateSidebar();
    runBoot(showWelcome);
    input.focus();
});
