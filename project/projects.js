var PROJECTS = [
    new Project('WhatToDo', 'swe', 'python',
        'Python, FastAPI, Claude API, Docker, AWS',
        [
            'Drafted and owned backend design for a 4-person team: 3-model SQLAlchemy schema on AWS RDS with JWT auth and bcrypt password hashing.',
            'Built a dual-provider AI engine with automatic failover between LLM providers.',
            'CI/CD via GitHub Actions, deployed to AWS App Runner/ECR.'
        ],
        [{ label: 'GitHub', url: 'https://github.com/Shiqiu17/CS5500-final-project' }]
    ),
    new Project('Physiological Signal Analytics Platform', 'swe', 'python',
        'Python, FastAPI, DuckDB, Pydantic',
        [
            'Two-layer system: Python ETL/analysis library for batch processing and a FastAPI REST API over DuckDB with offset pagination, composable filters, and Pydantic validation.',
            'Analysis endpoints for PCA, FFT, and spectral density supporting interactive exploration of physiological signals.'
        ],
        [
            { label: 'API', url: 'https://github.com/magana272/popanedb-backend' },
            { label: 'Library', url: 'https://github.com/magana272/POPANEpy' }
        ]
    ),
    new Project('Rate Limiter Service', 'swe', 'go',
        'Go, Redis, Docker',
        [
            'High-performance Go reverse proxy with fixed window and token bucket rate limiting.',
            'Atomic Redis transactions prevent race conditions under 1,000+ concurrent requests.',
            'CSV-driven load testing harness for burst, steady-state, and multi-user traffic patterns.'
        ],
        [{ label: 'GitHub', url: 'https://github.com/magana272/Rate-Limiter-Service' }]
    ),
    new Project('Paxos Key-Value Store', 'swe', 'java',
        'Java, RPC',
        [
            'Fault-tolerant distributed KV store using Paxos consensus with Proposer, Acceptor, and Learner roles over RPC.',
            'Dynamic cluster joins via RPC-based node discovery.',
            'Validated under chaos testing with 10% acceptor failure rate, leader crashes, and network partitions.'
        ],
        [{ label: 'GitHub', url: 'https://github.com/magana272/PAXOS-Key-Value-Store' }]
    ),
    new Project('CPU Scheduler Simulator', 'swe', 'c',
        'C',
        [
            'Process scheduler implementing MLFQ, Round Robin, and SJF with preemption, priority boosting, and I/O wait handling via custom min-heap queues.',
            'Zero leaks (Valgrind-validated).'
        ],
        [{ label: 'GitHub', url: 'https://github.com/magana272/Scheduler' }]
    ),
    new Project('Staircase Concurrency Simulator', 'swe', 'c',
        'C',
        [
            'Multi-threaded simulator with semaphore-based synchronization enforcing direction constraints to prevent deadlock and starvation.',
            'RR and FIFO schedulers with unit and concurrency stress tests.'
        ],
        [{ label: 'GitHub', url: 'https://github.com/magana272/Stairs' }]
    ),
    new Project('Cell Type Classification from scRNA-seq', 'ml', 'python',
        'Python, PyTorch, NumPy, Pandas',
        [
            'Benchmarked 3 deep learning architectures (1D CNN, TOSICA-inspired Transformer, GraphSAGE GNN) on 76K-cell Allen Brain Atlas data across 17 classes, achieving 92.65% balanced accuracy.',
            'Engineered a sparse masked embedding layer (98.7% sparsity) projecting 8,822 genes into 300 Reactome pathway tokens.',
            'Built cross-platform transfer pipeline to SMART-seq data (47K cells) with confidence-based unknown cell detection.'
        ],
        [{ label: 'GitHub', url: 'https://github.com/magana272/Cell-Type-Classification' }]
    ),
    new Project('Emotion Recognition from Physiological Signals', 'ml', 'python',
        'Python, TensorFlow/Keras, scikit-learn',
        [
            'Conv1D-BiLSTM hybrid classifier for binary emotion recognition from 6 biosignals (ECG, EDA, blood pressure, respiration, temperature).',
            'Signal preprocessing pipeline with sliding-window segmentation and per-channel standardization across 25+ GB of data.',
            'Implemented INT8 quantization targeting TinyML deployment on wearable microcontrollers.'
        ]
    ),
    new Project('Deep Learning Coursework (CS7150)', 'ml', 'python',
        'Python, PyTorch, TensorFlow',
        [
            'U-Net for brain tumor segmentation on BraTS 2020 MRI data.',
            'Transfer learning (VGG16, InceptionV3) for image classification.',
            'Generative models: GAN, DDPM diffusion, Flow Matching, RealNVP.',
            'RNN, Transformer, and VAE architectures for text generation and latent space modeling.'
        ]
    )
];

(function () {
    var container = document.getElementById('projects');
    var noResults = document.getElementById('no-results');

    PROJECTS.forEach(function (p) {
        container.insertBefore(p.render(), noResults);
    });
})();
