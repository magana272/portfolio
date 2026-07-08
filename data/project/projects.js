var PROJECTS = [
    new Project({
        name: 'PayPath',
        featured: true,
        tint: '#7cd097',
        ink: '#0e5734',
        category: 'swe',
        lang: 'go',
        tech: 'Go, Next.js 16, React 19, MongoDB, Docker',
        bullets: [
            'Full-stack personal finance dashboard: Go REST API (net/http, MongoDB, JWT) behind a Next.js 16 frontend.',
            'Computes taxes, net worth, debt payoff timelines, and cash-flow projections from income, bills, and debts.',
            'Bill & income calendar with editable occurrences: move a bill, log a purchase, override a paycheck.',
            'AI insights grounded in your data: financial health score, debt payoff strategy, expense audit.'
        ],
        links: [
            { label: 'Live', url: 'https://pay-path-mu.vercel.app/' },
            { label: 'GitHub', url: 'https://github.com/magana272/PayPath' }
        ],
        description: 'Know where every paycheck goes — taxes, bills, debt, and what\'s left.',
        cover: 'media/img/paypathimg/bill_calendar.png',
        media: [
            'media/img/paypathimg/bill_calendar.png',
            'media/img/paypathimg/paybreakdown.png',
            'media/img/paypathimg/tax.png',
            'media/img/paypathimg/expenseBreakdown.png',
            'media/img/paypathimg/personalizedFinAdvice/insights.png',
            'media/img/paypathimg/personalizedFinAdvice/debt-payoff-strategy.png'
        ],
        caseStudy: {
            problem: 'Most budgeting apps stop at "what did you spend." I wanted one that answers "where does each paycheck actually go" — after taxes, bills, and debt — and projects what is left.',
            approach: 'Built both halves solo: a layered Go REST API over MongoDB and a Next.js 16 dashboard, sharing one finance model that derives taxes, net worth, and payoff timelines from your inputs.',
            outcome: 'A working personal-finance dashboard with a per-occurrence bill & income calendar, pay and tax breakdowns, trend charts, and AI insights grounded in your own numbers.',
            role: 'Solo Developer',
            duration: 'Personal project',
            type: 'Full-stack app',
            year: '2026',
            highlights: [
                'Go net/http REST API over MongoDB with JWT + bcrypt auth, an in-memory TTL cache, and singleflight read-collapsing.',
                'Bill & income calendar where every occurrence is editable — move a bill, log a one-time purchase, or override a single paycheck.',
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
                        'A Go JSON REST API (net/http) with per-feature services — income, expenses, debts, auth, reporting, and AI — each depending on repository interfaces over MongoDB.',
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
        }
    }),
    new Project({
        name: 'DADA-85',
        featured: true,
        tint: '#eb9a63',
        ink: '#8a3a0b',
        category: 'swe',
        lang: 'typescript',
        tech: 'TypeScript, React 19, three.js, Tailwind, Vite',
        bullets: [
            'Three calculators (basic, scientific, programmer) from one config-driven state machine.',
            'Programmer mode: live HEX/DEC/BIN conversion and 32-bit bitwise ops.',
            'Rendered as real DOM inside a three.js room via synced WebGL + CSS3D.',
            'Budget-tuned renderer with a lazy-loaded ~650 kB three.js chunk.'
        ],
        links: [
            { label: 'Live', url: 'https://dada-85.vercel.app/' },
            { label: 'GitHub', url: 'https://github.com/magana272/DADA-85' }
        ],
        description: 'A calculator that lives in a three.js room, next to a vintage laptop and a burning 240Z.',
        takeaway: 'One of the first apps anyone writes is a calculator. This one is for my dad.',
        cover: 'media/vid/ezgif-6804e20ef176d44d.webm',
        poster: 'media/img/dada85/dada85.jpg',
        media: [
            'media/vid/ezgif-6804e20ef176d44d.webm',
            'media/vid/fire.webm'
        ],
        caseStudy: {
            problem: 'A calculator is the "hello world" of apps, but I wanted to see how far the idea could stretch: one engine driving three very different calculators, rendered not as flat UI but as a physical object inside a 3D scene.',
            approach: 'Built the whole thing solo — the calculation engine, three calculator configs, and a hybrid WebGL + DOM renderer that places the real, clickable calculator inside a three.js room.',
            outcome: 'One config-driven engine now powers basic, scientific, and programmer calculators, rendered as interactive DOM inside a 3D room that stays within a tight performance budget.',
            role: 'Solo Developer',
            duration: 'Personal project',
            type: '3D web app',
            year: '2026',
            note: 'A personal project, dedicated to my dad, so this case study focuses on the architecture and rendering decisions rather than a product outcome.',
            highlights: [
                'One 141-line state machine drives three distinct calculators through config objects — a new calculator is a data change, not new control flow.',
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
        }
    }),
    new Project({
        name: 'Trak',
        featured: true,
        tint: '#84b2ee',
        ink: '#1b3d7c',
        category: 'swe',
        lang: 'java',
        tech: 'Java, Swing, DuckDB, Redis, MongoDB, Gradle',
        bullets: [
            'Full-stack sprint planner in Java: desktop GUI, 22-command CLI, and 21-endpoint REST API.',
            '5 interchangeable DB backends behind one DAO interface, selectable at runtime.',
            'Google OAuth, email password recovery, and a native macOS installer via jpackage.',
            '254 automated tests across Cucumber BDD and JUnit.'
        ],
        links: [
            { label: 'GitHub', url: 'https://github.com/magana272/Trak' },
            { label: 'macOS Installer', url: 'https://github.com/magana272/Trak/releases/tag/v1.0.0-installer' }
        ],
        description: 'Sprint planning without the ceremony — one core behind a GUI, a CLI, and a REST API.',
        cover: 'media/img/trak/trak.png',
        media: ['media/img/trak/trak.png'],
        caseStudy: {
            problem: 'Jira is too heavy for small teams and plain todo lists are too light. The middle ground — real sprint planning without ceremony — was missing.',
            approach: 'Built a full-stack sprint planner with three front doors (desktop GUI, CLI, REST API) sharing one service layer, plus five swappable storage backends chosen at first run.',
            outcome: 'A single sprint planner that runs locally or client/server, stores data in any of five backends, and ships as a native desktop app backed by 254 automated tests.',
            role: 'Developer',
            duration: 'Course project',
            type: 'Full-stack tool',
            year: '2025',
            highlights: [
                'A Swing desktop GUI, a 22-command CLI, and a 21-endpoint REST API, all over one shared service layer that switches between local and HTTP backends at startup.',
                'Five interchangeable backends — DuckDB, JSON, Parquet, Redis, MongoDB — behind a generic DAO interface, selected at first run via a setup wizard.',
                '254 automated tests: 101 Cucumber scenarios across 12 feature files, plus 153 JUnit tests spanning every backend, auth flow, and endpoint.'
            ],
            stack: ['Java 23', 'Swing', 'DuckDB', 'Redis', 'MongoDB', 'Gradle', 'Cucumber', 'JUnit'],
            sections: [
                {
                    title: 'Overview',
                    body: [
                        'Trak is a sprint planning and task tracking tool: create projects, break work into tasks, plan sprints, and track progress. When a sprint is active, in-progress tasks show a live countdown against their estimate and sprints track completed vs total task counts.',
                        'The same application ships as three clients — a CLI, a Swing desktop GUI, and a REST API server — so a solo user can run it locally while a team can point clients at a shared server.'
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
                        'An EnvLoader with clear precedence — system env, bundled properties, app-support .env, then working-directory .env — so the same build runs in development and as an installed app.',
                        'BDD-first testing: 101 Cucumber scenarios describe behavior, backed by 153 JUnit tests that run each scenario against every storage backend.'
                    ]
                }
            ]
        }
    }),
    new Project({
        name: 'WhatToDo',
        featured: true,
        tint: '#b493ee',
        ink: '#472a84',
        category: 'swe',
        lang: 'python',
        tech: 'Python, FastAPI, PostgreSQL, Docker, AWS',
        bullets: [
            'Owned backend design for a 4-person team: SQLAlchemy schema on AWS RDS with JWT auth.',
            'Dual-provider AI engine (OpenAI + Anthropic) with automatic failover.',
            'ICS calendar export and AWS SES email; CI/CD via GitHub Actions to AWS App Runner.'
        ],
        links: [
            { label: 'Live', url: 'https://magana272.github.io/WhatToDo/' },
            { label: 'GitHub', url: 'https://github.com/magana272/WhatToDo' }
        ],
        description: 'Don\'t know what to do today? Let AI turn your preferences into a real itinerary.',
        cover: 'media/img/whattodo/Home.png',
        media: [
            'media/img/whattodo/Home.png',
            'media/img/whattodo/Results.png',
            'media/img/whattodo/SavedItin.png'
        ],
        caseStudy: {
            problem: 'Deciding what to do with free time is its own small chore: you know your interests, but turning them into an actual plan means searching across maps, events, and calendars by hand.',
            approach: 'Owned the backend for a four-person team — the data model, auth, the AI provider layer, the ICS export, and the deployment pipeline — behind a Next.js frontend.',
            outcome: 'A containerized FastAPI service on AWS that turns preferences into a time-ordered itinerary of real activities, exportable as a calendar file, with a provider-agnostic AI engine that fails over between LLMs.',
            role: 'Backend Lead',
            duration: 'Course project',
            type: 'Team project',
            year: '2025',
            highlights: [
                'A SQLAlchemy schema on PostgreSQL (AWS RDS) with JWT auth and bcrypt hashing, plus AWS SES for account email.',
                'A dual-provider AI engine using an abstract base class for provider-agnostic discovery, with automatic failover between OpenAI and Anthropic.',
                'Itineraries export to ICS calendar files, and CI/CD via GitHub Actions ships a containerized API to AWS App Runner through ECR.'
            ],
            stack: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'OpenAI', 'Anthropic', 'Docker', 'AWS'],
            sections: [
                {
                    title: 'Overview',
                    body: [
                        'What To Do is an AI-powered activity planner. A user enters location, date, time window, budget, and interests, and the system classifies intent, discovers real activities, normalizes them into a common format, and returns a time-ordered itinerary that can be saved or downloaded as a calendar file.',
                        'I led the backend for a four-person team, owning everything from the data model to the deployment pipeline.'
                    ]
                },
                {
                    title: 'What I built',
                    body: ['The backend and its AI layer, designed so the LLM provider is an implementation detail rather than a hard dependency.'],
                    list: [
                        'A FastAPI service with a SQLAlchemy schema on AWS RDS, JWT auth with bcrypt hashing, and AWS SES for transactional email.',
                        'A provider-agnostic AI engine: an abstract base class discovers available providers and fails over automatically, so an outage on one LLM does not take the feature down.',
                        'Activity normalization into a unified shape (title, location, time, description) and ICS export so an itinerary drops straight into a calendar.'
                    ]
                },
                {
                    title: 'Technical decisions',
                    body: [
                        'The system leans on external APIs that can be slow or flaky, so reliability and deployment were first-class concerns.'
                    ],
                    list: [
                        'Graceful degradation: failed provider calls fail over or return partial results rather than erroring the whole request, keeping results within a ~45s budget.',
                        'A CI/CD pipeline where GitHub Actions builds and pushes the Docker image to AWS ECR for deployment on App Runner, with the frontend on Vercel.'
                    ]
                }
            ]
        }
    }),
    new Project({
        name: 'Physiological Signal Analytics Platform',
        tint: '#69c9c3',
        ink: '#0c4c4e',
        category: 'swe',
        lang: 'python',
        tech: 'Python, FastAPI, DuckDB, Pydantic',
        mono: 'PS',
        bullets: [
            'Two-layer system: a Python ETL/analysis library plus a production REST API.',
            'FastAPI over DuckDB with pagination, composable filters, and Pydantic validation.',
            'Analysis endpoints for PCA, FFT, and spectral density.'
        ],
        links: [
            { label: 'API', url: 'https://github.com/magana272/popanedb-backend' },
            { label: 'Library', url: 'https://github.com/magana272/POPANEpy' }
        ],
        description: 'Query, filter, and run PCA, FFT, and spectral analyses over physiological signals through one API.',
        cover: 'media/img/PhysiologicalSignalAnalyticsPlatform/emotions.png',
        fit: 'contain',
        media: ['media/img/PhysiologicalSignalAnalyticsPlatform/emotions.png'],
        caseStudy: {
            problem: 'Physiological signal datasets are large and awkward to explore. Researchers needed to query raw signals and derived features without writing analysis code from scratch each time.',
            approach: 'Designed a two-layer system — a reusable analysis library and a production API over it — so the same logic serves batch scripts and interactive tools.',
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
        }
    }),
    new Project({
        name: 'Paxos Key-Value Store',
        tint: '#95a3ee',
        ink: '#2b3468',
        category: 'swe',
        lang: 'java',
        tech: 'Java, RPC, Paxos',
        mono: 'Px',
        bullets: [
            'Fault-tolerant distributed KV store using Paxos consensus over RPC.',
            'RPC-based node discovery and membership for dynamic cluster joins.',
            'Validated under chaos testing: acceptor failures, leader crashes, partitions.'
        ],
        links: [{ label: 'GitHub', url: 'https://github.com/magana272/PAXOS-Key-Value-Store' }],
        description: 'A key-value store that stays consistent even when nodes crash.',
        cover: 'media/img/paxos/paxos.png',
        fit: 'contain',
        media: ['media/img/paxos/paxos.png'],
        caseStudy: {
            problem: 'A key-value store should stay correct even when nodes crash or the network splits. That requires real distributed consensus, not a single-writer shortcut.',
            approach: 'Implemented a fault-tolerant KV store on Paxos with full Proposer / Acceptor / Learner roles over RPC, plus a membership protocol for dynamic clusters.',
            outcome: 'A distributed key-value store that maintains consistency through acceptor failures, leader crashes, and network partitions via majority quorum.',
            role: 'Developer',
            duration: 'Course project',
            type: 'Distributed systems',
            year: '2025',
            highlights: [
                'Paxos consensus with Proposer, Acceptor, and Learner roles communicating over RPC.',
                'RPC-based node discovery and membership enabling dynamic cluster joins with reliable state propagation.',
                'Consistency held under chaos testing: a 10% acceptor failure rate, leader crashes, and network partitions.'
            ],
            stack: ['Java', 'RPC', 'Paxos'],
            sections: [
                {
                    title: 'Overview',
                    body: [
                        'This project is a distributed key-value store built on the Paxos consensus algorithm. The goal was correctness under failure: reads and writes stay consistent even when individual nodes crash or the cluster partitions.'
                    ]
                },
                {
                    title: 'What I built',
                    body: ['A consensus-backed key-value store designed to survive node and network failure.'],
                    list: [
                        'A fault-tolerant distributed KV store using Paxos consensus with Proposer, Acceptor, and Learner roles over RPC.',
                        'An RPC-based node discovery and membership protocol enabling dynamic cluster joins with reliable state propagation.',
                        'Chaos testing at a 10% acceptor failure rate, with leader crashes and network partitions, while maintaining consensus via majority quorum.'
                    ]
                }
            ]
        }
    }),
    new Project({
        name: 'Cell Type Classification from scRNA-seq',
        tint: '#ec93bd',
        ink: '#79264e',
        category: 'ml',
        lang: 'python',
        tech: 'Python, PyTorch, NumPy, Pandas',
        mono: 'CT',
        bullets: [
            'Benchmarked CNN, Transformer, and GNN cell-type classifiers on 76K cells, 17 classes.',
            'Sparse pathway-embedding layer (98.7% sparse) for interpretable attention.',
            'Leakage-aware preprocessing and inverse-frequency class weighting.',
            'Cross-platform transfer to SMART-seq with unknown-cell detection.'
        ],
        links: [{ label: 'GitHub', url: 'https://github.com/magana272/Cell-Type-Classification' }],
        description: 'Classify 76K brain cells across 17 types using gene expression alone.',
        cover: 'media/img/celltypeClass/fig_mpan_results.png',
        fit: 'contain',
        media: ['media/img/celltypeClass/fig_mpan_results.png'],
        caseStudy: {
            problem: 'Annotating cell types from single-cell RNA sequencing is slow and manual. The question was which deep learning architecture does it best, and whether the model can stay interpretable.',
            approach: 'Benchmarked three architectures end to end, engineered a biologically interpretable embedding, and tested whether the model transfers across sequencing platforms.',
            outcome: 'Reached 92.65% balanced accuracy and 0.867 macro F1 across 17 classes, with a pathway-embedding layer that makes attention scores biologically readable.',
            role: 'Developer / Researcher',
            duration: 'Research project',
            type: 'ML research',
            year: '2025',
            highlights: [
                '92.65% balanced accuracy and 0.867 macro F1 across 17 classes on 76K cells.',
                'A sparse masked embedding (98.7% sparsity) mapping 8,822 genes to 300 Reactome pathway tokens, so attention scores rank pathway importance per cell type.',
                'Cross-platform transfer to 47K SMART-seq cells with confidence-based unknown-cell detection.'
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
                        'Benchmarked three architectures — a 1D CNN, a TOSICA-inspired Transformer, and a GraphSAGE GNN — on 76K-cell Allen Brain Atlas data across 17 classes, reaching 92.65% balanced accuracy and 0.867 macro F1.',
                        'Engineered a sparse masked embedding layer (98.7% sparsity) projecting 8,822 genes into 300 Reactome pathway tokens, enabling interpretable attention that ranks pathway importance per cell type.',
                        'Designed a leakage-aware preprocessing pipeline with stratified splitting before normalization, architecture-specific feature selection, and inverse-frequency class weighting with label smoothing.',
                        'Built cross-platform transfer to SMART-seq data (47K cells) with confidence-based unknown-cell detection, diagnosing a class-collapse failure mode driven by pathological loss weighting at extreme imbalance.'
                    ]
                }
            ]
        }
    }),
    new Project({
        name: 'Emotion Recognition from Physiological Signals',
        tint: '#efad5b',
        ink: '#7f400d',
        category: 'ml',
        lang: 'python',
        tech: 'Python, TensorFlow/Keras, scikit-learn',
        mono: 'ER',
        bullets: [
            'Conv1D-BiLSTM classifier for Neutral vs. Threat from 6 biosignals.',
            'Sliding-window preprocessing over 25+ GB across two POPANE studies.',
            'Fixed a class-collapse failure, lifting minority F1 from 0.04 to 0.39.',
            'INT8 quantization keeping 91% accuracy for TinyML deployment.'
        ],
        links: [],
        description: 'Can your heartbeat reveal how you feel? Detecting emotion from biosignals.',
        caseStudy: {
            problem: 'Can physiological signals alone reveal emotional state? The task was binary emotion recognition (Neutral vs. Threat) from biosignals, under heavy class imbalance.',
            approach: 'Built the model, the signal preprocessing pipeline, and an INT8-quantized baseline aimed at wearable deployment.',
            outcome: 'A Conv1D-BiLSTM classifier over six biosignals, with the minority-class failure diagnosed and F1 lifted from 0.04 to 0.39, plus an INT8 baseline holding 91% accuracy.',
            role: 'Developer / Researcher',
            duration: 'Research project',
            type: 'ML research',
            year: '2025',
            highlights: [
                'A Conv1D-BiLSTM classifier over six biosignals — ECG, EDA, blood pressure, respiration, and temperature.',
                'Diagnosed class collapse under 85/15 imbalance (Threat recall had dropped to 17%) and raised minority-class F1 from 0.04 to 0.39.',
                'INT8 quantization preserving 91% accuracy, targeting TinyML deployment on wearable microcontrollers.'
            ],
            stack: ['Python', 'TensorFlow/Keras', 'PyTorch', 'scikit-learn'],
            sections: [
                {
                    title: 'Overview',
                    body: [
                        'This project asks whether physiological signals alone can reveal emotional state, framed as binary emotion recognition (Neutral vs. Threat) from six biosignals under heavy class imbalance.'
                    ]
                },
                {
                    title: 'What I built',
                    body: ['A biosignal emotion classifier plus the pipeline and quantization work around it.'],
                    list: [
                        'A Conv1D-BiLSTM hybrid classifier in TensorFlow/Keras for binary emotion recognition from six biosignals.',
                        'A preprocessing pipeline with 5,000-sample sliding-window segmentation, Gaussian smoothing, and per-channel standardization, integrating 25+ GB across two POPANE studies into a unified corpus.',
                        'A fix for class collapse under 85/15 Neutral/Threat imbalance, using inverse-frequency class weighting and architecture search to raise minority-class F1 from 0.04 to 0.39.',
                        'INT8 quantization of input signals in a PyTorch LSTM baseline, cutting input precision from float64 to int8 while preserving 91% accuracy for TinyML deployment.'
                    ]
                }
            ]
        }
    })
];

(function () {
    var work = document.getElementById('work');
    if (!work) return;

    // Every project is its own full-height panel, in order.
    PROJECTS.forEach(function (p, i) {
        work.appendChild(p.renderFeature(i + 1));
    });
})();
