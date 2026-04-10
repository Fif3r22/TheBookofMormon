// Configure your chapters here.
// "file" is the path to the .txt file relative to index.html.
const chapters = [
  { id: 1, title: "Chapter 1: Introduction", file: "bom_text/the_bom/1_the_first_book_of_nephi/chapter_1.txt" },
  { id: 2, title: "Chapter 2: The Journey Begins", file: "chapters/chapter2.txt" },
  { id: 3, title: "Chapter 3: A New Challenge", file: "chapters/chapter3.txt" },
  // Add more chapters as needed...
];

const chapterListEl = document.getElementById("chapter-list");
const chapterTitleEl = document.getElementById("chapter-title");
const chapterBodyEl = document.getElementById("chapter-body");

function renderChapterList() {
  chapterListEl.innerHTML = "";

  chapters.forEach((chapter, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");

    button.textContent = chapter.title;
    button.addEventListener("click", () => {
      loadChapter(chapter);
      setActiveButton(index);
    });

    li.appendChild(button);
    chapterListEl.appendChild(li);
  });
}

function setActiveButton(activeIndex) {
  const buttons = chapterListEl.querySelectorAll("button");
  buttons.forEach((btn, idx) => {
    btn.classList.toggle("active", idx === activeIndex);
  });
}

async function loadChapter(chapter) {
  chapterTitleEl.textContent = chapter.title;
  chapterBodyEl.textContent = "Loading...";

  try {
    const response = await fetch(chapter.file);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const text = await response.text();
    chapterBodyEl.textContent = text;
  } catch (err) {
    chapterBodyEl.textContent = `Error loading chapter: ${err.message}`;
  }
}

// Initialize
renderChapterList();

// Optionally auto-load the first chapter:
if (chapters.length > 0) {
  loadChapter(chapters[0]);
  setActiveButton(0);
}
