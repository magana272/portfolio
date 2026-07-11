// Experience content — pure data. Each entry is an Experience (see
// models/experience.js); the home page renders them in pages/home.js.
import { Experience } from '../models/experience.js';

export const EXPERIENCES = [
    new Experience({
        title: 'Bioinformatics Scientist',
        company: 'Genentech',
        start: 'Nov 2022', end: 'Jul 2025', location: 'San Francisco, CA',
        bullets: [
            'Built a data-validation library in R, then co-led its port to Python (unit tests, PR reviews) and containerized it with Docker for an internal workflow system used by 20+ scientists.',
            'Processed a 200GB+ mass-spec dataset in PySpark after it outgrew the team\'s R/pandas tooling, converting to Parquet for protein filtering and summarization at scale.',
            'Extended an R Shiny dashboard beyond mass spec to new data types, letting 4 scientists repeat the same analysis across datasets.',
            'Automated benchmarking across 4 proteomics platforms (OLINK, ELLA, ELISA, mass spec), cutting method selection from weeks to days.'
        ],
        color: '#243bb0',   // vibrant royal blue
        tech: 'R, Python, PySpark, Docker, Parquet, R Shiny'
    }),
    new Experience({
        title: 'Research Technician',
        company: 'Weill Cornell Medicine',
        start: 'Jan 2022', end: 'Jul 2022', location: 'New York, NY',
        bullets: [
            'Optimized proteomics data pipelines, increasing peptide identification rates and expanding usable experimental data for downstream analysis.',
            'Set up and managed compute environments (VMs, WSL, Anaconda) for proteomics software, unblocking postdoctoral researchers from IT bottlenecks.',
            'Developed a Python tool to extract peptide n-mers from FASTA files, automating a manual sequence analysis step used across multiple experiments.'
        ],
        color: '#0a5450',   // vibrant deep teal
        tech: 'Python, Anaconda, WSL, BioPython'
    }),
    new Experience({
        title: 'Junior Data Scientist',
        company: 'Endless West',
        start: 'Mar 2021', end: 'Nov 2021', location: 'San Francisco, CA',
        bullets: [
            'Built ML pipelines (Logistic Regression, KNN, XGBoost, Random Forest) for sensory attribute prediction from chromatography data, enabling R&D to prioritize synthesis targets by predicted flavor profile instead of trial and error.',
            'Developed Python web scrapers using BeautifulSoup to extract and structure chemical property data from public databases, replacing hours of manual lookup per compound with a searchable local dataset.'
        ],
        color: '#7a1a6b',   // vibrant magenta-plum
        tech: 'Python, scikit-learn, XGBoost, BeautifulSoup'
    })
];
