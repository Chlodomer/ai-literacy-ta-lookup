"use strict";
const form = document.querySelector("#lookup");
const input = document.querySelector("#email");
const result = document.querySelector("#result");
const button = form.querySelector("button");
let dataPromise;
function show(message, ta, error = false) {
  result.replaceChildren();
  result.className = error ? "error" : "";
  const p = document.createElement("p"); p.textContent = message; result.append(p);
  if (ta) { const name = document.createElement("p"); name.className = "ta"; name.dir = "auto"; name.textContent = ta; result.append(name); }
  result.hidden = false;
}
input.addEventListener("input", () => { result.hidden = true; });
form.addEventListener("submit", async event => {
  event.preventDefault();
  const email = input.value.trim().toLowerCase();
  button.disabled = true;
  try {
    if (!dataPromise) dataPromise = fetch("./allocations.json").then(r => { if (!r.ok) throw new Error("load"); return r.json(); }).catch(e => { dataPromise = undefined; throw e; });
    const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(email));
    const key = Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2,"0")).join("");
    const data = await dataPromise;
    if (input.value.trim().toLowerCase() !== email) return;
    const index = data.assignments[key];
    if (index !== undefined) show("המתרגל או המתרגלת המשויכים אליכם:", data.tas[index]);
    else show("לא נמצאה התאמה. בדקו שהכתובת זהה לזו הרשומה בקורס. אם עדיין אין התאמה, פנו לצוות הקורס.", null, true);
  } catch {
    show("לא ניתן להשלים את החיפוש כרגע. בדקו את החיבור לאינטרנט ונסו שוב.", null, true);
  } finally { button.disabled = false; }
});
