# Student TA lookup

A Hebrew, mobile-friendly email lookup for AI and Academic Literacy, 2026–2027.

The published allocation file contains SHA-256 fingerprints of normalized email addresses and TA names. No student names or readable email addresses are included. Hashes do not prevent someone who already knows or guesses an email from checking its assignment. This is a public lookup, not an authenticated student portal.

Email input is trimmed and lowercased. Searches run in the browser, with no analytics, email submissions, or local storage. The original workbook is kept outside this repository. Sources: TA_Student_Allocations_2026-2027.xlsx (695 original assignments), plus AI_Academic_Literacy_Added_Students_2026-10-21.xlsx (99 additions assigned to Shaked Seker by the course lecturer on 2026-10-21). Total: 794 lookup entries, seven TAs. Original assignments are retained, including students absent from the latest export.

On 2026-10-25, ten previously unassigned emails were added: five to Shaked Seker, two to Ayelet Naveh, and three to Gali Alperstein. All 794 existing lookup entries were preserved exactly; total 804 entries. The four overlapping Ayelet/Shaked records remain assigned to Shaked Seker in this lookup, as required by the instruction to preserve existing assignments. The separate reconciliation report's totals therefore differ from this lookup.

Publish from the main branch root with GitHub Pages. To update allocations, update allocations.json from approved allocation records locally; do not commit the workbook or roster.
