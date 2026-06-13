var PROJECTS = [
    new Project('Trak', 'swe', 'java',
        'Java, Swing, DuckDB, Redis, MongoDB, Gradle',
        [
            'Built a full-stack sprint planning tool in Java with a desktop GUI (Swing), CLI (22 commands), and REST API (21 endpoints), all sharing a common service layer that switches between local and HTTP backends at startup.',
            'Implemented 5 interchangeable database backends (DuckDB, Redis, MongoDB, Parquet, JSON) behind a generic DAO interface (25 implementations), enabling runtime storage selection via factory without changing application code.',
            'Added Google OAuth sign-in, email-based password recovery (Jakarta Mail), a first-run setup wizard, and shipped v1.0.0 as a native macOS installer via jpackage.',
            'Wrote 254 automated tests: 101 Cucumber BDD scenarios across 12 feature files and 153 JUnit tests covering all 5 database backends, authentication flows, and API endpoints.'
        ],
        [{ label: 'GitHub', url: 'https://github.com/magana272/Trak' }],
        'Having trouble planning project? Jira too cumbersome and todo lists aren\'t enough?'
    ),
    new Project('WhatToDo', 'swe', 'python',
        'Python, FastAPI, Claude API, Docker, AWS',
        [
            'Drafted and owned backend design for a 4-person team: a 3-model SQLAlchemy schema on AWS RDS with JWT auth and bcrypt password hashing.',
            'Built a dual-provider AI engine using an abstract base class for provider-agnostic discovery with automatic failover between LLM providers.',
            'Established CI/CD pipeline with GitHub Actions and deployed containerized API to AWS (App Runner, ECR).'
        ],
        [{ label: 'GitHub', url: 'https://github.com/Shiqiu17/CS5500-final-project' }],
        'Don\'t know what to do today? Let AI figure it out for you.'
    ),
    new Project('Physiological Signal Analytics Platform', 'swe', 'python',
        'Python, FastAPI, DuckDB, Pydantic',
        [
            'Architected a two-layer system: a Python ETL/analysis library for batch processing and a production REST API for external and visualization-driven access.',
            'Built a FastAPI service over DuckDB exposing raw signals and derived features with offset pagination, composable query filters, and Pydantic validation.',
            'Implemented analysis endpoints for PCA, FFT, and spectral density supporting interactive exploration of physiological signals.'
        ],
        [
            { label: 'API', url: 'https://github.com/magana272/popanedb-backend' },
            { label: 'Library', url: 'https://github.com/magana272/POPANEpy' }
        ],
        'Query, filter, and analyze biosignals without writing a single line of code.'
    ),
    new Project('Rate Limiter Service', 'swe', 'go',
        'Go, Redis, Docker',
        [
            'Built a high-performance Go reverse proxy implementing fixed window and token bucket rate limiting with configurable per-user quotas.',
            'Used Redis transactions for atomic token consumption to prevent race conditions; validated under 1,000+ concurrent requests.',
            'Built CSV-driven load testing harness validating throttle accuracy across burst, steady-state, and multi-user traffic patterns.'
        ],
        [{ label: 'GitHub', url: 'https://github.com/magana272/Rate-Limiter-Service' }],
        'Protect your API from traffic spikes before they become outages.'
    ),
    new Project('Paxos Key-Value Store', 'swe', 'java',
        'Java, RPC',
        [
            'Implemented a fault-tolerant distributed KV store using Paxos consensus with Proposer, Acceptor, and Learner roles over RPC.',
            'Designed RPC-based node discovery and membership protocol enabling dynamic cluster joins with reliable state propagation.',
            'Validated under chaos testing: 10% acceptor failure rate, leader crashes, and network partitions while maintaining consensus via majority quorum.'
        ],
        [{ label: 'GitHub', url: 'https://github.com/magana272/PAXOS-Key-Value-Store' }],
        'A key-value store that stays consistent even when nodes crash.'
    ),
    new Project('CPU Scheduler Simulator', 'swe', 'c',
        'C',
        [
            'Built process scheduler implementing MLFQ, Round Robin, and SJF with preemption, priority boosting, and I/O wait handling via custom min-heap queues.',
            'Validated with Valgrind (zero leaks); implemented verbose tracing for job state transitions and simulation statistics.'
        ],
        [{ label: 'GitHub', url: 'https://github.com/magana272/Scheduler' }],
        'See how your OS decides which process runs next.'
    ),
    new Project('Staircase Concurrency Simulator', 'swe', 'c',
        'C',
        [
            'Built multi-threaded simulator with semaphore-based synchronization; enforced direction constraints to prevent deadlock and starvation.',
            'Implemented RR and FIFO schedulers; validated correctness with unit tests and concurrency stress tests.'
        ],
        [{ label: 'GitHub', url: 'https://github.com/magana272/Stairs' }],
        'What happens when threads share a one-way staircase?'
    ),
    new Project('Cell Type Classification from scRNA-seq', 'ml', 'python',
        'Python, PyTorch, NumPy, Pandas',
        [
            'Benchmarked 3 deep learning architectures (1D CNN, TOSICA-inspired Transformer, GraphSAGE GNN) for cell-type annotation on 76K-cell Allen Brain Atlas scRNA-seq data across 17 classes, achieving 92.65% balanced accuracy and 0.867 macro F1.',
            'Engineered a sparse masked embedding layer (98.7% sparsity) that projects 8,822 genes into 300 Reactome pathway tokens, enabling biologically interpretable attention scores that rank pathway importance per cell type.',
            'Designed a leakage-aware preprocessing pipeline with stratified splitting before normalization, architecture-specific feature selection (200 HVGs vs. 8,822 pathway-mapped genes), and inverse-frequency class weighting with label smoothing.',
            'Built a cross-platform transfer pipeline to SMART-seq data (47K cells) with confidence-based unknown cell detection; identified and diagnosed a critical class-collapse failure mode driven by pathological loss weighting at extreme imbalance ratios.'
        ],
        [{ label: 'GitHub', url: 'https://github.com/magana272/Cell-Type-Classification' }],
        'Classify 76K brain cells across 17 types using gene expression alone.'
    ),
    new Project('Emotion Recognition from Physiological Signals', 'ml', 'python',
        'Python, TensorFlow/Keras, scikit-learn',
        [
            'Designed a Conv1D-BiLSTM hybrid classifier in TensorFlow/Keras for binary emotion recognition (Neutral vs. Threat) from 6 biosignals (ECG, EDA, blood pressure, respiration, temperature).',
            'Engineered a signal preprocessing pipeline with 5,000-sample sliding-window segmentation, Gaussian smoothing, and per-channel standardization; integrated raw data across two POPANE studies (25+ GB, 7 biosignal modalities) into a unified training corpus.',
            'Diagnosed a class-collapse failure mode under 85/15 Neutral/Threat imbalance (Threat recall dropped to 17% despite 87% overall accuracy); applied inverse-frequency class weighting and architecture search (LSTM units 64–750) to improve minority-class F1 from 0.04 to 0.39.',
            'Implemented INT8 quantization of input signals in a PyTorch LSTM baseline, reducing model input precision from float64 to int8 while preserving 91% classification accuracy, targeting TinyML deployment on wearable microcontrollers.'
        ],
        [],
        'Can your heartbeat reveal how you feel? Detect emotions from biosignals.'
    ),
    new Project('Deep Learning Coursework (CS7150)', 'ml', 'python',
        'Python, PyTorch, TensorFlow',
        [
            'Built U-Net from scratch for brain tumor segmentation on BraTS 2020 multi-modal MRI data (T1, T1ce, T2, FLAIR); evaluated with Dice coefficient and IoU across binary and multi-class segmentation tasks.',
            'Applied transfer learning (VGG16, InceptionV3) to image classification and trained 1D CNNs on DNA sequences for biological motif detection.',
            'Implemented generative models from scratch: GAN, DDPM diffusion, Flow Matching (RK4 ODE solver), RealNVP normalizing flows, and convolutional diffusion on MNIST.',
            'Built RNN, multi-layer RNN, Transformer (self-attention, causal masking, positional encoding), and VAE (reparameterization trick, KL divergence) architectures for text generation and latent space modeling.'
        ],
        [],
        'U-Nets, GANs, Transformers, and diffusion models — built from scratch.'
    )
];

(function () {
    var container = document.getElementById('projects');
    var noResults = document.getElementById('no-results');

    PROJECTS.forEach(function (p) {
        container.insertBefore(p.render(), noResults);
    });
})();
