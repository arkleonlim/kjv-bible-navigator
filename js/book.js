function normalizeBook(book) {
  return book.toLowerCase().replace(/\s+/g, "");
}

async function loadBook(bookName) {
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

      verse.innerHTML = `<a href="#${id}" class="verse">${v.verse}</a> ${v.text}`;

      container.appendChild(verse);
    });
  });

  setupVerseClick(container);
  highlightFromHash();
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
   CLICK VERSE TO HIGHLIGHT
------------------------------*/

function setupVerseClick(container) {
  container.addEventListener("click", (e) => {
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
  });
}

/* -----------------------------
   URL HANDLING
------------------------------*/

const params = new URLSearchParams(window.location.search);

const book = decodeURIComponent(params.get("book") || "Genesis");

loadBook(book);
