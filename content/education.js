// Education content — pure data. features/education/education.js renders the
// #education band from this: degree entries (with course groupings) plus one
// publication. HTML entities in the source strings are preserved verbatim so
// the rendered markup matches the hand-authored original byte for byte.
export const EDUCATION = {
    degrees: [
        {
            degree: 'M.S. Computer Science',
            detail: '&middot; Northeastern University (May 2026)',
            // A course line is either a plain string or { cat, courses } when it
            // carries a category label (the Berkeley entry groups by department).
            courses: [
                'Algorithms, Distributed Systems, Computer Networking, Software Engineering, Machine Learning, Deep Learning'
            ]
        },
        {
            degree: 'B.A. Molecular and Cell Biology: Neurobiology',
            detail: '&middot; UC Berkeley (May 2021)',
            courses: [
                { cat: 'Molecular &amp; Cell Biology', courses: 'Biochemistry (MCB 102), Genetics, Genomics &amp; Cell Biology (MCB 104), Cellular &amp; Molecular Neurobiology (MCB 160), Neurobiology Lab (MCB 160L), Circuit, Systems &amp; Behavioral Neuroscience (MCB 161)' },
                { cat: 'Computer Science &amp; Engineering', courses: 'Data Structures (CS 61B), Machine Structures (CS 61C), Designing Information Devices &amp; Systems (EE 16A/16B), BioMEMS (BioE 121), Principles &amp; Techniques of Data Science (Data 100), Discrete Mathematics, Intro to Programming in C++' }
            ]
        }
    ],
    publication: {
        title: 'Accounting for longitudinal peak quality metrics with MSstats+ enhances differential analysis in proteomic experiments with data-independent acquisition',
        authors: 'Kohler D, Dogu E, Karayel O, <strong>Magana M</strong>, Wu A, Bhattacharya M, Anania V, Vitek O',
        detail: 'Under review &middot; Nature Communications &middot; bioRxiv 2025 &middot; <a href="https://doi.org/10.1101/2025.09.11.675573">doi:10.1101/2025.09.11.675573</a>'
    }
};
