"use strict";
const form = document.querySelector("#lookup");
const input = document.querySelector("#email");
const result = document.querySelector("#result");
const button = form.querySelector("button");
// Preferred contact addresses from the existing TA dashboard roster.
// Keep contacts separate from the approved, unchanged allocation records.
const taEmails = Object.freeze({
  "Natasha Noam Gol": "noam.n.g.98@gmail.com",
  "Shaked Seker": "shaked.sek@gmail.com",
  "Alexandra Litinsky": "litinskys@gmail.com",
  "Shaked Ben Tal": "shakedbt02@gmail.com",
  "Gali Alperstein": "galialperstein@gmail.com",
  "Yarden Belenky": "belenky@biu.ac.il",
  "Ayelet Naveh": "ayelet.naveh@gmail.com"
});
let dataPromise;
function emailLink(email) {
  const link = document.createElement("a");
  link.href = `mailto:${email}`;
  link.dir = "ltr";
  link.className = "email-link";
  link.textContent = email;
  return link;
}
function show(message, ta, error = false) {
  result.replaceChildren();
  result.className = error ? "error" : "";
  const p = document.createElement("p"); p.textContent = message; result.append(p);
  if (ta) {
    const name = document.createElement("p");
    name.className = "ta";
    name.dir = "auto";
    name.textContent = ta;
    result.append(name);
    const contact = document.createElement("p");
    const email = taEmails[ta];
    if (email) contact.append(emailLink(email));
    else contact.textContent = "כתובת הדוא״ל של המתרגל או המתרגלת אינה זמינה כרגע.";
    result.append(contact);
    const lecturer = document.createElement("div");
    lecturer.className = "lecturer-contact";
    const note = document.createElement("p");
    note.textContent = "במקרה הצורך, ניתן לפנות גם למרצה הקורס, פרופ׳ יניב פוקס, בדוא״ל הבא:";
    const lecturerEmail = document.createElement("p");
    lecturerEmail.append(emailLink("yaniv.fox@biu.ac.il"));
    lecturer.append(note, lecturerEmail);
    result.append(lecturer);
  }
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
