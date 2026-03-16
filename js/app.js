/* -----------------------------
   THEME TOGGLE
------------------------------*/

const themeToggle = document.getElementById("themeToggle");

function setTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("dark");
    themeToggle.textContent = "🕶️";
  }

  localStorage.setItem("theme", theme);
}

function toggleTheme() {
  const current = document.body.classList.contains("dark") ? "dark" : "light";

  const next = current === "dark" ? "light" : "dark";

  setTheme(next);
}

themeToggle.addEventListener("click", toggleTheme);

/* load saved theme */

const savedTheme = localStorage.getItem("theme") || "dark";

setTheme(savedTheme);

function normalizeBook(book) {
  return book.toLowerCase().replace(/\s+/g, "");
}

const sections = {
  Pentateuch: ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy"],

  History: [
    "Joshua",
    "Judges",
    "Ruth",
    "1Samuel",
    "2Samuel",
    "1Kings",
    "2Kings",
    "1Chronicles",
    "2Chronicles",
    "Ezra",
    "Nehemiah",
    "Esther",
  ],

  Wisdom: ["Job", "Psalms", "Proverbs", "Ecclesiastes", "SongofSolomon"],

  MajorProphets: ["Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel"],

  MinorProphets: [
    "Hosea",
    "Joel",
    "Amos",
    "Obadiah",
    "Jonah",
    "Micah",
    "Nahum",
    "Habakkuk",
    "Zephaniah",
    "Haggai",
    "Zechariah",
    "Malachi",
  ],

  Gospels: ["Matthew", "Mark", "Luke", "John"],

  Acts: ["Acts"],

  Pauline: [
    "Romans",
    "1Corinthians",
    "2Corinthians",
    "Galatians",
    "Ephesians",
    "Philippians",
    "Colossians",
    "1Thessalonians",
    "2Thessalonians",
    "1Timothy",
    "2Timothy",
    "Titus",
    "Philemon",
  ],

  General: [
    "Hebrews",
    "James",
    "1Peter",
    "2Peter",
    "1John",
    "2John",
    "3John",
    "Jude",
  ],

  Revelation: ["Revelation"],
};

/* -----------------------------
   HARD CODED CHAPTER COUNTS
------------------------------*/

const chapterCounts = {
  Genesis: 50,
  Exodus: 40,
  Leviticus: 27,
  Numbers: 36,
  Deuteronomy: 34,
  Joshua: 24,
  Judges: 21,
  Ruth: 4,
  "1Samuel": 31,
  "2Samuel": 24,
  "1Kings": 22,
  "2Kings": 25,
  "1Chronicles": 29,
  "2Chronicles": 36,
  Ezra: 10,
  Nehemiah: 13,
  Esther: 10,

  Job: 42,
  Psalms: 150,
  Proverbs: 31,
  Ecclesiastes: 12,
  SongofSolomon: 8,

  Isaiah: 66,
  Jeremiah: 52,
  Lamentations: 5,
  Ezekiel: 48,
  Daniel: 12,

  Hosea: 14,
  Joel: 3,
  Amos: 9,
  Obadiah: 1,
  Jonah: 4,
  Micah: 7,
  Nahum: 3,
  Habakkuk: 3,
  Zephaniah: 3,
  Haggai: 2,
  Zechariah: 14,
  Malachi: 4,

  Matthew: 28,
  Mark: 16,
  Luke: 24,
  John: 21,

  Acts: 28,

  Romans: 16,
  "1Corinthians": 16,
  "2Corinthians": 13,
  Galatians: 6,
  Ephesians: 6,
  Philippians: 4,
  Colossians: 4,
  "1Thessalonians": 5,
  "2Thessalonians": 3,
  "1Timothy": 6,
  "2Timothy": 4,
  Titus: 3,
  Philemon: 1,

  Hebrews: 13,
  James: 5,
  "1Peter": 5,
  "2Peter": 3,
  "1John": 5,
  "2John": 1,
  "3John": 1,
  Jude: 1,

  Revelation: 22,
};

/* ----------------------------- */

function formatSectionName(name) {
  return name.replace(/([A-Z])/g, " $1").trim();
}

function populateSelects() {
  const otBooks = [
    ...sections.Pentateuch,
    ...sections.History,
    ...sections.Wisdom,
    ...sections.MajorProphets,
    ...sections.MinorProphets,
  ];

  const ntBooks = [
    ...sections.Gospels,
    ...sections.Acts,
    ...sections.Pauline,
    ...sections.General,
    ...sections.Revelation,
  ];

  const ot = document.getElementById("otSelect");
  const nt = document.getElementById("ntSelect");

  otBooks.forEach((b) => {
    const o = document.createElement("option");
    o.value = b;
    o.text = b;
    ot.appendChild(o);
  });

  ntBooks.forEach((b) => {
    const o = document.createElement("option");
    o.value = b;
    o.text = b;
    nt.appendChild(o);
  });
}

function goBook(selectId) {
  const book = document.getElementById(selectId).value;

  const anchor = document.getElementById(book);

  if (anchor) {
    anchor.scrollIntoView({ behavior: "smooth" });
  }
}

/* -----------------------------
   BUILD BOOK SECTIONS
------------------------------*/

function buildSection(sectionName, books) {
  const container = document.getElementById("books");

  const section = document.createElement("div");
  section.id = sectionName;

  const title = document.createElement("h2");
  title.className = "section-title";

  title.innerHTML = `${formatSectionName(sectionName)} `;

  const topBtn = document.createElement("button");
  topBtn.textContent = "🔼";
  topBtn.className = "top-button";

  topBtn.addEventListener("click", () => {
    document.getElementById("top").scrollIntoView({ behavior: "smooth" });
  });

  title.appendChild(topBtn);

  section.appendChild(title);

  for (const book of books) {
    const bookDiv = document.createElement("div");

    const bookTitle = document.createElement("h3");
    bookTitle.id = book;

    bookTitle.textContent = book + " ";

    bookDiv.appendChild(bookTitle);

    const chapters = document.createElement("div");

    const bookKey = normalizeBook(book);
    const count = chapterCounts[book];

    for (let ch = 1; ch <= count; ch++) {
      const button = document.createElement("button");

      const chapterAnchor = `${bookKey}-chapter-${ch}`;

      button.textContent = ch;
      button.className = "chapter-link";

      button.addEventListener("click", () => {
        window.location.href = `book.html?book=${encodeURIComponent(book)}#${chapterAnchor}`;
      });

      chapters.appendChild(button);
    }
    bookDiv.appendChild(chapters);
    section.appendChild(bookDiv);
  }

  container.appendChild(section);
}

/* -----------------------------
   QUICK NAVIGATION
------------------------------*/

const quickBook = document.getElementById("quickBook");
const quickChapter = document.getElementById("quickChapter");
const quickVerse = document.getElementById("quickVerse");

function populateQuickBooks() {
  const books = [];

  Object.values(sections).forEach((group) => {
    books.push(...group);
  });

  books.forEach((b) => {
    const o = document.createElement("option");
    o.value = b;
    o.text = b;
    quickBook.appendChild(o);
  });
}

function loadChapters() {
  const book = quickBook.value;

  quickChapter.innerHTML = "";
  quickVerse.innerHTML = "";

  const count = chapterCounts[book];

  for (let i = 1; i <= count; i++) {
    const o = document.createElement("option");
    o.value = i;
    o.text = i;

    quickChapter.appendChild(o);
  }

  loadVerses();
}

async function loadVerses() {
  const book = quickBook.value;
  const chapter = quickChapter.value;

  const res = await fetch(`data/${book}.json`);
  const data = await res.json();

  const chapterData = data.chapters.find((c) => c.chapter == chapter);

  quickVerse.innerHTML = "";

  chapterData.verses.forEach((v) => {
    const o = document.createElement("option");

    o.value = v.verse;
    o.text = v.verse;

    quickVerse.appendChild(o);
  });
}

function quickGo() {
  const book = quickBook.value;
  const chapter = quickChapter.value;
  const verse = quickVerse.value;

  const bookKey = normalizeBook(book);

  const id = `${bookKey}-${chapter}-${verse}`;

  window.location.href = `book.html?book=${encodeURIComponent(book)}#${id}`;
}

/* ----------------------------- */

quickBook.addEventListener("change", loadChapters);
quickChapter.addEventListener("change", loadVerses);

populateQuickBooks();
loadChapters();

function init() {
  populateSelects();

  for (const [name, books] of Object.entries(sections)) {
    buildSection(name, books);
  }
}

init();
