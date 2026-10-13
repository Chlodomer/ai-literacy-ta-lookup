# Student TA lookup

A Hebrew, mobile-friendly email lookup for AI and Academic Literacy, 2026–2027.

The published allocation file contains SHA-256 fingerprints of normalized email addresses and TA names. No student names or readable email addresses are included. Hashes do not prevent someone who already knows or guesses an email from checking its assignment. This is a public lookup, not an authenticated student portal.

Email input is trimmed and lowercased. Searches run in the browser, with no analytics, email submissions, or local storage. The original workbook is kept outside this repository. Source: TA_Student_Allocations_2026-2027.xlsx, 695 students, seven TAs.

Publish from the main branch root with GitHub Pages. To update allocations, regenerate allocations.json from the approved workbook locally; do not commit the workbook or roster.
