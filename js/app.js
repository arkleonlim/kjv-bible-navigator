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

// convert section keys to readable titles
function formatSectionName(name) {
  return name.replace(/([A-Z])/g, " $1").trim();
}

// populate dropdowns
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

async function buildSection(sectionName, books) {
  const container = document.getElementById("books");

  //   // ----- Divider -----
  //   const divider = document.createElement("div");
  //   divider.className = "divider";

  //   container.appendChild(divider);

  // ----- Section -----
  const section = document.createElement("div");
  section.id = sectionName;

  const title = document.createElement("h2");
  title.className = "section-title";
  title.innerHTML = `${formatSectionName(sectionName)} <a href="#top">[^]</a>`;

  section.appendChild(title);

  for (const book of books) {
    const res = await fetch(`data/${book}.json`);
    const data = await res.json();

    const bookDiv = document.createElement("div");

    const bookTitle = document.createElement("h3");
    bookTitle.id = book;
    bookTitle.innerHTML = `${data.book} <a href="#top">[^]</a>`;

    bookDiv.appendChild(bookTitle);

    const chapters = document.createElement("div");

    const bookKey = normalizeBook(book);

    data.chapters.forEach((ch) => {
      const link = document.createElement("a");

      const chapterAnchor = `${bookKey}-chapter-${ch.chapter}`;

      link.href = `book.html?book=${encodeURIComponent(book)}#${chapterAnchor}`;

      link.textContent = ch.chapter;
      link.className = "chapter-link";

      chapters.appendChild(link);
    });

    bookDiv.appendChild(chapters);

    section.appendChild(bookDiv);
  }

  container.appendChild(section);
}

async function init() {
  populateSelects();

  for (const [name, books] of Object.entries(sections)) {
    await buildSection(name, books);
  }
}

// ---

const quickBook = document.getElementById("quickBook");
const quickChapter = document.getElementById("quickChapter");
const quickVerse = document.getElementById("quickVerse");

async function populateQuickBooks() {
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

async function loadChapters() {
  const book = quickBook.value;

  const res = await fetch(`data/${book}.json`);
  const data = await res.json();

  quickChapter.innerHTML = "";
  quickVerse.innerHTML = "";

  data.chapters.forEach((ch) => {
    const o = document.createElement("option");
    o.value = ch.chapter;
    o.text = ch.chapter;
    quickChapter.appendChild(o);
  });

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

quickBook.addEventListener("change", loadChapters);
quickChapter.addEventListener("change", loadVerses);

populateQuickBooks();
loadChapters();

init();
