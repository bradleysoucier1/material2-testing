const noteForm = document.getElementById('noteForm');
const notesGrid = document.getElementById('notesGrid');
const noteTemplate = document.getElementById('noteTemplate');
const searchInput = document.getElementById('searchInput');

const attachRipples = (root = document) => {
  root.querySelectorAll('.mdc-button, .mdc-fab, .mdc-card__primary-action').forEach((element) => {
    if (!element.dataset.rippleBound) {
      mdc.ripple.MDCRipple.attachTo(element);
      element.dataset.rippleBound = 'true';
    }
  });
};

const initializeMdc = () => {
  document.querySelectorAll('.mdc-text-field').forEach((element) => {
    if (!element.dataset.mdcInitialized) {
      new mdc.textField.MDCTextField(element);
      element.dataset.mdcInitialized = 'true';
    }
  });

  attachRipples();
};

const createNote = (title, body) => {
  const note = noteTemplate.content.firstElementChild.cloneNode(true);
  note.querySelector('h3').textContent = title;
  note.querySelector('p').textContent = body;
  notesGrid.prepend(note);
  attachRipples(note);
};

noteForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById('noteTitle').value.trim();
  const body = document.getElementById('noteBody').value.trim();

  if (!title || !body) {
    return;
  }

  createNote(title, body);
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

initializeMdc();
