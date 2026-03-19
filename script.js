const noteForm = document.getElementById('noteForm');
const notesGrid = document.getElementById('notesGrid');
const noteTemplate = document.getElementById('noteTemplate');
const searchInput = document.getElementById('searchInput');

noteForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById('noteTitle').value.trim();
  const body = document.getElementById('noteBody').value.trim();

  if (!title || !body) {
    return;
  }

  const note = noteTemplate.content.firstElementChild.cloneNode(true);
  note.querySelector('h3').textContent = title;
  note.querySelector('p').textContent = body;
  notesGrid.prepend(note);
  noteForm.reset();
});

searchInput.addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase();
  const notes = notesGrid.querySelectorAll('[data-note]');

  notes.forEach((note) => {
    const text = note.textContent.toLowerCase();
    note.classList.toggle('hidden', !text.includes(query));
  });
});
