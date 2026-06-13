var EXPERIENCES = [
    new Experience('Bioinformatics Scientist', 'Genentech',
        'Nov 2022', 'Jul 2025', 'San Francisco, CA',
        [
            'Designed a data validation library in R, then collaborated with 2 computational scientists to port it to Python with unit tests and PR reviews; wrote scripts consuming input files via the library and containerized them with Docker for an internal workflow system used by 20+ scientists.',
            'Used PySpark to process a 200GB+ mass spectrometry dataset that exceeded the team\'s R and pandas tooling; converted to Parquet for faster reads, enabling protein filtering and summarization at scale.',
            'Implemented features in an R Shiny dashboard with one other scientist, extending support beyond mass spec to additional data types so 4 team scientists could reliably repeat the same analysis across different datasets.',
            'Built automated benchmarking workflows across 4 proteomics platforms (OLINK, ELLA, ELISA, Mass Spectrometry), accelerating method selection from weeks to days.'
        ]
    ),
    new Experience('Research Technician', 'Weill Cornell Medicine',
        'Jan 2022', 'Jul 2022', 'New York, NY',
        [
            'Optimized proteomics data pipelines, increasing peptide identification rates and expanding usable experimental data for downstream analysis.',
            'Set up and managed compute environments (VMs, WSL, Anaconda) for proteomics software, unblocking postdoctoral researchers from IT bottlenecks.',
            'Developed a Python tool to extract peptide n-mers from FASTA files, automating a manual sequence analysis step used across multiple experiments.'
        ]
    ),
    new Experience('Junior Data Scientist', 'Endless West',
        'Mar 2021', 'Nov 2021', 'San Francisco, CA',
        [
            'Built ML pipelines (Logistic Regression, KNN, XGBoost, Random Forest) for sensory attribute prediction from chromatography data, enabling R&D to prioritize synthesis targets by predicted flavor profile instead of trial and error.',
            'Developed Python web scrapers using BeautifulSoup to extract and structure chemical property data from public databases, replacing hours of manual lookup per compound with a searchable local dataset.'
        ]
    )
];

(function () {
    var container = document.getElementById('experience');

    EXPERIENCES.forEach(function (e) {
        container.appendChild(e.render());
    });
})();
