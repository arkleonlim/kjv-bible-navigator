/* -----------------------------
   LOADER
------------------------------*/

const loader = document.getElementById("loader");

function showLoader() {
  if (loader) loader.style.display = "grid";
}

function hideLoader() {
  if (loader) loader.remove();
}

/* -----------------------------
   THEME LOAD
------------------------------*/

const savedTheme = localStorage.getItem("theme") || "dark";

if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

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

setTheme(savedTheme);

function normalizeBook(book) {
  return book.toLowerCase().replace(/\s+/g, "");
}

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

let longPressTimer = null;
let suppressVerseClick = false;
let currentUtterance = null;

async function loadBook(bookName) {
  showLoader();

  const res = await fetch(`data/${bookName}.json`);
  const data = await res.json();

  const container = document.getElementById("bible");
  const nav = document.getElementById("chapters");

  container.innerHTML = "";
  nav.innerHTML = "";

  document.getElementById("bookTitle").innerText = data.book;

  const bookKey = normalizeBook(bookName);

  hideLoader();

  await new Promise(requestAnimationFrame);

  const totalChapters = chapterCounts[bookName];

  const chapterMap = Object.fromEntries(
    data.chapters.map((c) => [c.chapter, c]),
  );

  for (let chapterNum = 1; chapterNum <= totalChapters; chapterNum++) {
    const chapter = chapterMap[chapterNum];
    if (!chapter) continue;

    const chapterId = `${bookKey}-chapter-${chapterNum}`;

    const button = document.createElement("button");
    button.textContent = chapterNum;
    button.className = "chapter-link";

    button.addEventListener("click", () => {
      document.getElementById(chapterId)?.scrollIntoView({
        behavior: "smooth",
      });
    });

    nav.appendChild(button);

    const chapterTitle = document.createElement("h2");
    chapterTitle.id = chapterId;
    chapterTitle.textContent = `${data.book} ${chapterNum} `;

    const topBtn = document.createElement("button");
    topBtn.textContent = "🔼";
    topBtn.className = "top-button-book";

    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    chapterTitle.appendChild(topBtn);
    container.appendChild(chapterTitle);

    for (const v of chapter.verses) {
      const verse = document.createElement("p");

      const id = `${bookKey}-${chapterNum}-${v.verse}`;
      verse.id = id;

      verse.dataset.book = data.book;
      verse.dataset.chapter = chapterNum;
      verse.dataset.verse = v.verse;
      verse.dataset.text = v.text;

      verse.innerHTML = `<a href="#${id}" class="verse">${v.verse}</a> ${v.text}`;

      container.appendChild(verse);
    }
  }

  /* allow repaint once after DOM build */

  await new Promise(requestAnimationFrame);

  setupVerseClick(container);
  highlightFromHash();
}

// async function loadBook(bookName) {
//   showLoader();

//   const res = await fetch(`data/${bookName}.json`);
//   const data = await res.json();

//   const container = document.getElementById("bible");
//   const nav = document.getElementById("chapters");

//   container.innerHTML = "";
//   nav.innerHTML = "";

//   document.getElementById("bookTitle").innerText = data.book;

//   const bookKey = normalizeBook(bookName);

//   /* hide loader before heavy DOM work */
//   hideLoader();

//   /* allow browser to repaint */
//   await new Promise(requestAnimationFrame);

//   const fragment = document.createDocumentFragment();

//   data.chapters.forEach((chapter) => {
//     const chapterId = `${bookKey}-chapter-${chapter.chapter}`;

//     const button = document.createElement("button");
//     button.textContent = chapter.chapter;
//     button.className = "chapter-link";

//     button.addEventListener("click", () => {
//       document.getElementById(chapterId)?.scrollIntoView({
//         behavior: "smooth",
//       });
//     });

//     nav.appendChild(button);

//     const chapterTitle = document.createElement("h2");
//     chapterTitle.id = chapterId;

//     chapterTitle.textContent = `${data.book} ${chapter.chapter} `;

//     const topBtn = document.createElement("button");
//     topBtn.textContent = "🔼";
//     topBtn.className = "top-button-book";

//     topBtn.addEventListener("click", () => {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     });

//     chapterTitle.appendChild(topBtn);

//     fragment.appendChild(chapterTitle);

//     chapter.verses.forEach((v) => {
//       const verse = document.createElement("p");

//       const id = `${bookKey}-${chapter.chapter}-${v.verse}`;
//       verse.id = id;

//       verse.dataset.book = data.book;
//       verse.dataset.chapter = chapter.chapter;
//       verse.dataset.verse = v.verse;
//       verse.dataset.text = v.text;

//       verse.innerHTML = `<a href="#${id}" class="verse">${v.verse}</a> ${v.text}`;

//       fragment.appendChild(verse);
//     });
//   });

//   container.appendChild(fragment);

//   setupVerseClick(container);
//   highlightFromHash();
// }

/* -----------------------------
   SPEAK VERSE USING BROWSER TTS
------------------------------*/

function speakVerse(text) {
  if (!("speechSynthesis" in window)) {
    console.warn("This browser does not support speech synthesis.");
    return;
  }

  window.speechSynthesis.cancel();

  currentUtterance = new SpeechSynthesisUtterance(text);

  currentUtterance.lang = "en-US";
  currentUtterance.rate = 1;
  currentUtterance.pitch = 1;
  currentUtterance.volume = 1;

  window.speechSynthesis.speak(currentUtterance);
}

/* -----------------------------
   COPY VERSE TO CLIPBOARD
------------------------------*/

function copyVerse(text, book, chapter, verse, element) {
  const copyText = `"${text}" - ${book} ${chapter}:${verse} KJV`;

  navigator.clipboard.writeText(copyText);

  showTooltip(element, "Copied!");
}

/* -----------------------------
   TOOLTIP
------------------------------*/

function showTooltip(element, message) {
  const tip = document.createElement("div");

  tip.textContent = message;
  tip.style.position = "absolute";
  tip.style.background = "#333";
  tip.style.color = "#fff";
  tip.style.padding = "4px 8px";
  tip.style.borderRadius = "4px";
  tip.style.fontSize = "12px";
  tip.style.zIndex = "1000";

  const rect = element.getBoundingClientRect();

  tip.style.left = rect.left + window.scrollX + "px";
  tip.style.top = rect.top + window.scrollY - 28 + "px";

  document.body.appendChild(tip);

  setTimeout(() => {
    tip.remove();
  }, 1200);
}

/* -----------------------------
   HIGHLIGHT FROM URL
------------------------------*/

function highlightFromHash() {
  if (!window.location.hash) return;

  const id = window.location.hash.substring(1);
  const target = document.getElementById(id);

  if (target) {
    target.classList.add("highlight-verse");

    target.scrollIntoView({
      block: "center",
      behavior: "auto",
    });
  }
}

/* -----------------------------
   CLICK VERSE TO HIGHLIGHT + READ
------------------------------*/

function setupVerseClick(container) {
  container.addEventListener("click", (e) => {
    if (suppressVerseClick) {
      suppressVerseClick = false;
      return;
    }

    const link = e.target.closest(".verse");
    const verseElement = e.target.closest("#bible p");

    let verseId = null;

    if (link) {
      e.preventDefault();
      verseId = link.getAttribute("href").substring(1);
    } else if (verseElement) {
      verseId = verseElement.id;
    }

    if (!verseId) return;

    const verse = document.getElementById(verseId);
    if (!verse) return;

    document
      .querySelectorAll(".highlight-verse")
      .forEach((el) => el.classList.remove("highlight-verse"));

    verse.classList.add("highlight-verse");

    history.replaceState(null, "", `#${verseId}`);

    const text = verse.dataset.text || "";

    speakVerse(text);
  });
}

/* -----------------------------
   URL HANDLING
------------------------------*/

const params = new URLSearchParams(window.location.search);

const book = decodeURIComponent(params.get("book") || "Genesis");

loadBook(book);
/* -----------------------------
   FOOTER SCROLL TO TOP
------------------------------*/

const scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
