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

    // chapter navigation
    const link = document.createElement("a");
    link.href = `#${chapterId}`;
    link.innerText = chapter.chapter;
    nav.appendChild(link);

    // chapter heading
    const chapterTitle = document.createElement("h2");

    chapterTitle.id = chapterId;

    chapterTitle.innerHTML = `
      ${data.book} ${chapter.chapter}
      <a href="#top">[^]</a>
    `;

    container.appendChild(chapterTitle);

    // verses
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

function setupVerseClick(container) {
  container.addEventListener("click", (e) => {
    // find verse link if clicked
    const link = e.target.closest(".verse");

    // find verse paragraph
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

    // remove previous highlight
    document
      .querySelectorAll(".highlight-verse")
      .forEach((el) => el.classList.remove("highlight-verse"));

    // highlight selected verse
    verse.classList.add("highlight-verse");

    // update URL without scrolling
    history.replaceState(null, "", `#${verseId}`);
  });
}

// URL handling
const params = new URLSearchParams(window.location.search);

const book = decodeURIComponent(params.get("book") || "Genesis");

loadBook(book);
