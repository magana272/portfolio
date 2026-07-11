// Long-form deep-dive copy for the "Learn more" pages, keyed by project slug
// (see slugify() in core.js). Kept out of content/projects.js so the home page
// never parses ~25 KB of text it doesn't render; only pages/project.html loads
// this file. A project opts in by setting `deepDive: true` in projects.js.
export const DEEP_DIVES = {
    'paypath': {
        problem: 'Most budgeting apps stop at "what did you spend." I wanted one that answers "where does each paycheck actually go" (after taxes, bills, and debt) and projects what is left.',
        approach: 'Built both halves solo: a layered Go REST API over MongoDB and a Next.js 16 dashboard, sharing one finance model that derives taxes, net worth, and payoff timelines from your inputs.',
        outcome: 'A working personal-finance dashboard with a per-occurrence bill & income calendar, pay and tax breakdowns, trend charts, and AI insights grounded in your own numbers.',
        role: 'Solo Developer',
        duration: 'Personal project',
        type: 'Full-stack app',
        year: '2026',
        highlights: [
            'Go net/http REST API over MongoDB with JWT + bcrypt auth, an in-memory TTL cache, and singleflight read-collapsing.',
            'Bill & income calendar where every occurrence is editable: move a bill, log a one-time purchase, or override a single paycheck.',
            'OpenAI-backed advice grounded in your data: a financial health score, debt-payoff strategy, expense audit, and income-boost report.'
        ],
        stack: ['Go', 'net/http', 'MongoDB', 'Next.js 16', 'React 19', 'Recharts', 'Docker'],
        sections: [
            {
                title: 'Overview',
                body: [
                    'PayPath is a personal finance dashboard that tracks income, expenses, debts, and liquid assets, then turns them into computed taxes, net worth, debt payoff timelines, and cash-flow projections.',
                    'The aim was a tool that reasons about a paycheck the way you actually experience it: gross comes in, taxes and bills come out, debt gets serviced, and something is left to save.'
                ]
            },
            {
                title: 'What I built',
                body: ['A monorepo with two independently deployable apps over one shared finance model.'],
                list: [
                    'A Go JSON REST API (net/http) with per-feature services (income, expenses, debts, auth, reporting, and AI), each depending on repository interfaces over MongoDB.',
                    'A Next.js App Router dashboard: an Explore section (debt payoff, cash flow, pay & tax breakdowns, trend charts), a bill & income calendar with per-occurrence edits, and settings.',
                    'A pay & tax engine that breaks gross into federal, state, Social Security, Medicare, and SDI, surfacing effective rate, effective $/hr, and savings rate.',
                    'PayPath AI: OpenAI-backed insights with a health score, strengths, and warnings, plus dedicated debt-payoff, savings, expense-audit, and income-boost reports.'
                ]
            },
            {
                title: 'Technical decisions',
                body: [
                    'The backend is a layered, feature-folder Go module: thin HTTP handlers call services that depend on repository interfaces, so storage stays swappable and the business logic stays testable.'
                ],
                list: [
                    'An in-memory TTL cache with singleflight read-collapsing, so a burst of identical reads hits MongoDB once.',
                    'A single MONGODB_URI mode switch: blank spins up a bundled Mongo container via Docker Compose, or point it at Atlas to skip the container entirely.',
                    'Recharts visualizations behind a small fetch wrapper with client-side caching, keeping the dashboard responsive without a data-fetching framework.'
                ]
            }
        ]
    },
    'dada-85': {
        problem: 'A calculator is the "hello world" of apps, but I wanted to see how far the idea could stretch: one engine driving three very different calculators, rendered not as flat UI but as a physical object inside a 3D scene.',
        approach: 'Built the whole thing solo: the calculation engine, three calculator configs, and a hybrid WebGL + DOM renderer that places the real, clickable calculator inside a three.js room.',
        outcome: 'One config-driven engine now powers basic, scientific, and programmer calculators, rendered as interactive DOM inside a 3D room that stays within a tight performance budget.',
        role: 'Solo Developer',
        duration: 'Personal project',
        type: '3D web app',
        year: '2026',
        note: 'A personal project, dedicated to my dad, so this deep dive focuses on the architecture and rendering decisions rather than a product outcome.',
        highlights: [
            'One 141-line state machine drives three distinct calculators through config objects; a new calculator is a data change, not new control flow.',
            'Programmer mode does live HEX/DEC/BIN conversion with 32-bit bitwise operations, and its keypad disables digits invalid in the current base.',
            'The calculator renders as real DOM inside a three.js room through a single shared camera, staying fully clickable.'
        ],
        stack: ['TypeScript', 'React 19', 'three.js', 'CSS3D', 'Tailwind CSS', 'Vite', 'Vitest'],
        sections: [
            {
                title: 'Overview',
                body: [
                    'DADA-85 is a calculator that lives inside a rendered 3D room, sitting on a desk next to a vintage laptop and a burning Datsun 240Z. You can orbit the camera, grab the calculator to spin it, and click the laptop to fly up to its terminal.',
                    'It is the first app most people write, rebuilt as an exercise in how much architecture and rendering craft a "simple" calculator can absorb. The name and the dedication are personal: this one is for my dad.'
                ]
            },
            {
                title: 'What I built',
                body: ['A single calculation engine plus a hybrid renderer that treats the calculator as a physical object in a three.js room.'],
                list: [
                    'A 141-line state machine where operations are a strategy map and commands are composable state functions, so basic, scientific, and programmer calculators are each just a config object.',
                    'A programmer mode supporting HEX/DEC/BIN with live base conversion and 32-bit bitwise operations, where the keypad is derived from state so invalid digits disable themselves.',
                    'A hybrid renderer drawing synchronized WebGL and CSS3D scenes through one camera, so the calculator is real, clickable DOM sitting inside the 3D room.',
                    'A boot sequence gated on asset loading and shader compilation, so nothing pops in half-rendered.'
                ]
            },
            {
                title: 'Technical decisions',
                body: [
                    'Rendering real DOM inside three.js meant solving occlusion between meshes and DOM elements: the calculator sits in a CSS3D layer behind a transparent WebGL canvas, yet room geometry still needs to pass in front of it.'
                ],
                list: [
                    'Config objects over inheritance, so calculators compose from shared operations and commands.',
                    'Invisible depth-writing quads punch a hole in the canvas where the calculator sits while still writing depth, letting nearer meshes cover it correctly.',
                    'An extruded rounded-rectangle case rebuilt from a ResizeObserver, so the body regenerates whenever the DOM face changes size.'
                ]
            },
            {
                title: 'Constraints',
                body: ['three.js is heavy and a calculator should feel instant, so keeping the scene smooth without a slow first load drove most of the performance work.'],
                list: [
                    'Froze matrices for static objects and rendered shadow maps only when something moves.',
                    'Capped pixel ratio at 1.5 and repainted the terminal at 15 fps so high-DPI screens do not quietly quadruple the work.',
                    'Lazy-loaded the ~650 kB three.js chunk via React.lazy, so the calculator boots before the 3D scene is needed.'
                ]
            }
        ]
    },
    'trak': {
        problem: 'Jira is too heavy for small teams and plain todo lists are too light. The middle ground, real sprint planning without ceremony, was missing.',
        approach: 'Built a full-stack sprint planner with three front doors (desktop GUI, CLI, REST API) sharing one service layer, plus five swappable storage backends chosen at first run.',
        outcome: 'A single sprint planner that runs locally or client/server, stores data in any of five backends, and ships as a native desktop app backed by 254 automated tests.',
        role: 'Developer',
        duration: 'Course project',
        type: 'Full-stack tool',
        year: '2025',
        highlights: [
            'A Swing desktop GUI, a 22-command CLI, and a 21-endpoint REST API, all over one shared service layer that switches between local and HTTP backends at startup.',
            'Five interchangeable backends (DuckDB, JSON, Parquet, Redis, MongoDB) behind a generic DAO interface, selected at first run via a setup wizard.',
            '254 automated tests: 101 Cucumber scenarios across 12 feature files, plus 153 JUnit tests spanning every backend, auth flow, and endpoint.'
        ],
        stack: ['Java 23', 'Swing', 'DuckDB', 'Redis', 'MongoDB', 'Gradle', 'Cucumber', 'JUnit'],
        sections: [
            {
                title: 'Overview',
                body: [
                    'Trak is a sprint planning and task tracking tool: create projects, break work into tasks, plan sprints, and track progress. When a sprint is active, in-progress tasks show a live countdown against their estimate and sprints track completed vs total task counts.',
                    'The same application ships as three clients (a CLI, a Swing desktop GUI, and a REST API server), so a solo user can run it locally while a team can point clients at a shared server.'
                ]
            },
            {
                title: 'What I built',
                body: ['Three interfaces over a common core, with storage and identity handled the same way regardless of client.'],
                list: [
                    'A generic DAO interface with implementations for DuckDB (default), JSON, Parquet, Redis, and MongoDB, configured through a workspace file and selectable at runtime via a factory.',
                    'A first-run setup wizard for connection mode and storage backend, with Google OAuth sign-in, a bundled guest account, and email-based password recovery over SMTP (Jakarta Mail).',
                    'A native installer via jpackage (.dmg / .msi / .deb) that bundles a JRE and the GUI fat jar, so the target machine needs no separate Java install.'
                ]
            },
            {
                title: 'Technical decisions',
                body: [
                    'Correctness across five backends and two run modes needed broad automated coverage and a disciplined way to load secrets.'
                ],
                list: [
                    'An EnvLoader with clear precedence (system env, bundled properties, app-support .env, then working-directory .env), so the same build runs in development and as an installed app.',
                    'BDD-first testing: 101 Cucumber scenarios describe behavior, backed by 153 JUnit tests that run each scenario against every storage backend.'
                ]
            }
        ]
    },
    'whattodo': {
        problem: 'Deciding what to do with free time is its own small chore: you know your interests, but turning them into an actual plan means searching across maps, events, and calendars by hand.',
        approach: 'Owned the backend for a four-person team (the data model, auth, the AI provider layer, the ICS export, and the CI pipeline), and now maintain the project solo.',
        outcome: 'A Dockerized FastAPI service on Render that turns preferences into a time-ordered itinerary of real, web-searched activities, exportable as a calendar file, with a provider-agnostic AI engine running on OpenAI or Claude.',
        role: 'Backend Lead',
        duration: 'Course project',
        type: 'Team project',
        year: '2026',
        highlights: [
            'A 3-model SQLAlchemy schema (SQLite/PostgreSQL) with JWT auth and bcrypt hashing behind 12 FastAPI endpoints.',
            'A provider-agnostic AI engine grounded in live web search, selectable per request between OpenAI and Claude, with a second LLM pass validating event times.',
            'Itineraries export to ICS calendar files; GitHub Actions CI runs ruff and 86 pytest tests, with the Dockerized API on Render and the frontend on GitHub Pages.'
        ],
        stack: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'OpenAI', 'Anthropic', 'Docker', 'Render'],
        sections: [
            {
                title: 'Overview',
                body: [
                    'What To Do is an AI-powered activity planner. A user enters location, date, time window, budget, and interests, and the system searches the live web for real events, validates their times, and returns a time-ordered itinerary that can be saved or downloaded as a calendar file.',
                    'I led the backend for a four-person team, owning everything from the data model to the CI pipeline, and I now maintain the project solo.'
                ]
            },
            {
                title: 'What I built',
                body: ['The backend and its AI layer, designed so the LLM provider is an implementation detail rather than a hard dependency.'],
                list: [
                    'A FastAPI service with a 3-model SQLAlchemy schema (SQLite or PostgreSQL), JWT auth with bcrypt hashing, and optional SMTP email for password resets.',
                    'A provider-agnostic AI engine: an abstract base class with OpenAI and Claude implementations, selectable per request, each grounding discovery in live web search.',
                    'A 179-line system prompt enforcing verified real-world events, plus a second LLM validation pass correcting event times and durations.',
                    'Activity normalization into a unified 15-field shape and ICS export so an itinerary drops straight into a calendar.'
                ]
            },
            {
                title: 'Technical decisions',
                body: [
                    'The system leans on external APIs that can be slow or flaky, so reliability and deployment were first-class concerns.'
                ],
                list: [
                    'Graceful degradation: if the model skips its structured-output tool call, the service falls back to parsing the response text instead of failing the request.',
                    'A CI pipeline where GitHub Actions runs ruff and the 86-test pytest suite on every push; Render builds and deploys the Dockerized API, and the frontend static-exports to GitHub Pages.'
                ]
            }
        ]
    },
    'physiological-signal-analytics-platform': {
        problem: 'Physiological signal datasets are large and awkward to explore. Researchers needed to query raw signals and derived features without writing analysis code from scratch each time.',
        approach: 'Designed a two-layer system (a reusable analysis library and a production API over it), so the same logic serves batch scripts and interactive tools.',
        outcome: 'A FastAPI service over DuckDB that exposes raw signals, derived features, and on-demand analyses (PCA, FFT, spectral density) behind validated, paginated endpoints.',
        role: 'Developer',
        duration: 'Research project',
        type: 'Research tooling',
        year: '2025',
        highlights: [
            'A two-layer split: a Python ETL/analysis library for batch work, and a REST API over it for external and visualization-driven access.',
            'Composable query filters with offset pagination and Pydantic validation over a DuckDB store.',
            'Analysis endpoints for PCA, FFT, and spectral density, so researchers explore signals without writing analysis code.'
        ],
        stack: ['Python', 'FastAPI', 'DuckDB', 'Pydantic'],
        sections: [
            {
                title: 'Overview',
                body: [
                    'This platform lets researchers query, filter, and analyze physiological signals through an API instead of ad-hoc scripts. The core analysis lives in a reusable library so the same code powers both batch pipelines and the service.'
                ]
            },
            {
                title: 'What I built',
                body: ['A layered system separating reusable analysis from the service that exposes it.'],
                list: [
                    'A Python ETL/analysis library for batch processing, and a production FastAPI service for external and visualization-driven access.',
                    'A DuckDB-backed API exposing raw signals and derived features with offset pagination, composable query filters, and Pydantic validation.',
                    'Analysis endpoints for PCA, FFT, and spectral density that support interactive exploration of physiological signals.'
                ]
            }
        ]
    },
    'paxos-key-value-store': {
        problem: 'A key-value store should stay correct even when nodes crash or messages are lost. That requires real distributed consensus, not a single-writer shortcut.',
        approach: 'Implemented a fault-tolerant KV store on Paxos with full Proposer / Acceptor / Learner roles over Java RMI, plus an RPC membership protocol for cluster formation.',
        outcome: 'A distributed key-value store that maintains consistency through acceptor/proposer message loss and leader crashes via majority quorum.',
        role: 'Developer',
        duration: 'Course project',
        type: 'Distributed systems',
        year: '2025',
        highlights: [
            'Paxos consensus with Proposer, Acceptor, and Learner roles communicating over Java RMI.',
            'RPC-based node discovery and membership with reliable peer-set propagation across the cluster.',
            'Consistency held under fault injection: a 10% acceptor/proposer message-drop rate and leader crashes with automatic re-election.'
        ],
        stack: ['Java', 'RPC', 'Paxos'],
        sections: [
            {
                title: 'Overview',
                body: [
                    'This project is a distributed key-value store built on the Paxos consensus algorithm. The goal was correctness under failure: reads and writes stay consistent even when individual nodes crash or messages are dropped.'
                ]
            },
            {
                title: 'What I built',
                body: ['A consensus-backed key-value store designed to survive node crashes and message loss.'],
                list: [
                    'A fault-tolerant distributed KV store using Paxos consensus with Proposer, Acceptor, and Learner roles over Java RMI.',
                    'An RPC-based node discovery and membership protocol that propagates the peer set across the cluster at startup.',
                    'Fault injection at a 10% acceptor/proposer message-drop rate, with leader crashes and automatic re-election, while maintaining consensus via majority quorum.'
                ]
            }
        ]
    },
    'cell-type-classification-from-scrna-seq': {
        problem: 'Annotating cell types from single-cell RNA sequencing is slow and manual. The question was which deep learning architecture does it best, and whether the model can stay interpretable.',
        approach: 'Benchmarked four architectures end to end against published methods, and engineered a biologically interpretable pathway-masked embedding.',
        outcome: 'Ranked 1st of 21 methods on the 120-class mAtlas benchmark (84.1%) and 3rd of 24 on hPancreas (97.3%), with a pathway-masked embedding that makes attention scores biologically readable.',
        role: 'Developer / Researcher',
        duration: 'Research project',
        type: 'ML research',
        year: '2025',
        highlights: [
            '1st of 21 methods on the 76,797-cell, 120-class mAtlas benchmark (MLP, 84.1% accuracy); 3rd of 24 on hPancreas (GNN, 97.3%).',
            'A sparse masked embedding (~99% sparsity) mapping 10,000 genes to 300 Reactome pathway tokens, so attention scores rank pathway importance per cell type.',
            'A leakage-aware pipeline: stratified splitting before normalization, inverse-frequency class weighting, and label smoothing.'
        ],
        stack: ['Python', 'PyTorch', 'NumPy', 'Pandas'],
        sections: [
            {
                title: 'Overview',
                body: [
                    'This project benchmarks deep learning architectures for annotating cell types from single-cell RNA sequencing, and asks whether a model can be both accurate and biologically interpretable rather than a black box.'
                ]
            },
            {
                title: 'What I built',
                body: ['A benchmark and an interpretable model for cell-type annotation from scRNA-seq.'],
                list: [
                    'Benchmarked four architectures (an MLP, a 1D CNN, a TOSICA-inspired pathway-masked Transformer, and a GraphSAGE GNN) across three public benchmarks: hPancreas (14 classes), mPancreas (21 classes), and the 76,797-cell mAtlas (120 classes).',
                    'Placed 1st of 21 methods on mAtlas (MLP, 84.1%), 3rd of 24 on hPancreas (GNN, 97.3%), and 4th of 19 on mPancreas (Transformer, 78.9%) against published annotation baselines.',
                    'Engineered a sparse masked embedding layer (~99% sparsity) projecting 10,000 genes into 300 Reactome pathway tokens, enabling interpretable attention that ranks pathway importance per cell type.',
                    'Designed a leakage-aware preprocessing pipeline with stratified splitting before normalization, inverse-frequency class weighting, and label smoothing.'
                ]
            }
        ]
    },
    'emotion-recognition-from-physiological-signals': {
        problem: 'Can physiological signals alone reveal emotional state? The task was binary emotion recognition (Neutral vs. Threat) from biosignals, where the shorter Threat episodes leave the minority class prone to collapse.',
        approach: 'Built the model, the signal preprocessing pipeline, and an INT8-quantized baseline aimed at wearable deployment.',
        outcome: 'A Conv1D-BiLSTM classifier over six biosignals, with the minority-class failure diagnosed and F1 lifted from 0.04 to 0.39, plus an INT8 baseline holding 91% accuracy.',
        role: 'Developer / Researcher',
        duration: 'Research project',
        type: 'ML research',
        year: '2025',
        highlights: [
            'A Conv1D-BiLSTM classifier over six biosignals: ECG, EDA, blood pressure, respiration, and temperature.',
            'Diagnosed a minority-class collapse (Threat F1 near 0.04 despite high overall accuracy) and raised it to 0.39 with inverse-frequency class weighting and an LSTM-width search.',
            'INT8 quantization preserving 91% accuracy, targeting TinyML deployment on wearable microcontrollers.'
        ],
        stack: ['Python', 'TensorFlow/Keras', 'PyTorch', 'scikit-learn'],
        sections: [
            {
                title: 'Overview',
                body: [
                    'This project asks whether physiological signals alone can reveal emotional state, framed as binary emotion recognition (Neutral vs. Threat) from six biosignals, where the under-represented Threat class is prone to collapse.'
                ]
            },
            {
                title: 'What I built',
                body: ['A biosignal emotion classifier plus the pipeline and quantization work around it.'],
                list: [
                    'A Conv1D-BiLSTM hybrid classifier in TensorFlow/Keras for binary emotion recognition from six biosignals.',
                    'A preprocessing pipeline with 5,000-sample sliding-window segmentation, Gaussian smoothing, and per-channel standardization, integrating 25+ GB across two POPANE studies into a unified corpus.',
                    'A fix for minority-class collapse on the under-represented Threat windows, using inverse-frequency class weighting and an LSTM-width search (64-300) to raise minority-class F1 from 0.04 to 0.39.',
                    'INT8 quantization of input signals in a PyTorch LSTM baseline, cutting input precision from float64 to int8 while preserving 91% accuracy for TinyML deployment.'
                ]
            }
        ]
    }
};
