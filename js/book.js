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

/* -----------------------------
   LOADER
------------------------------*/

const loader = document.getElementById("loader");

function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}

function normalizeBook(book) {
  return book.toLowerCase().replace(/\s+/g, "");
}

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

  data.chapters.forEach((chapter) => {
    const chapterId = `${bookKey}-chapter-${chapter.chapter}`;

    /* -----------------------------
       CHAPTER NAVIGATION BUTTONS
    ------------------------------*/

    const button = document.createElement("button");
    button.textContent = chapter.chapter;
    button.className = "chapter-link";

    button.addEventListener("click", () => {
      document.getElementById(chapterId)?.scrollIntoView({
        behavior: "smooth",
      });
    });

    nav.appendChild(button);

    /* -----------------------------
       CHAPTER HEADING
    ------------------------------*/

    const chapterTitle = document.createElement("h2");
    chapterTitle.id = chapterId;

    chapterTitle.textContent = `${data.book} ${chapter.chapter} `;

    const topBtn = document.createElement("button");
    topBtn.textContent = "🔼";
    topBtn.className = "top-button-book";

    topBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    chapterTitle.appendChild(topBtn);
    container.appendChild(chapterTitle);

    /* -----------------------------
       VERSES
    ------------------------------*/

    chapter.verses.forEach((v) => {
      const verse = document.createElement("p");

      const id = `${bookKey}-${chapter.chapter}-${v.verse}`;
      verse.id = id;

      verse.dataset.book = data.book;
      verse.dataset.chapter = chapter.chapter;
      verse.dataset.verse = v.verse;
      verse.dataset.text = v.text;

      verse.innerHTML = `<a href="#${id}" class="verse">${v.verse}</a> ${v.text}`;

      container.appendChild(verse);

      /* -----------------------------
         LONG PRESS COPY FEATURE
      ------------------------------*/

      const startPress = () => {
        suppressVerseClick = false;

        longPressTimer = setTimeout(() => {
          suppressVerseClick = true;
          copyVerse(v.text, data.book, chapter.chapter, v.verse, verse);
        }, 1000);
      };

      const cancelPress = () => {
        clearTimeout(longPressTimer);
      };

      verse.addEventListener("mousedown", startPress);
      verse.addEventListener("touchstart", startPress, { passive: true });

      verse.addEventListener("mouseup", cancelPress);
      verse.addEventListener("mouseleave", cancelPress);
      verse.addEventListener("touchend", cancelPress);
      verse.addEventListener("touchcancel", cancelPress);
    });
  });

  setupVerseClick(container);
  highlightFromHash();

  setupVerseClick(container);
  highlightFromHash();

  hideLoader();
}

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
