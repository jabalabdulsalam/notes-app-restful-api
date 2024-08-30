import "./styles/style.css";
import "./script/component/index.js";

const BASE_URL = "https://notes-api.dicoding.dev/v2";

async function getNote() {
  try {
    const response = await fetch(`${BASE_URL}/notes`);
    const result = await response.json();
    
    if (result.data && Array.isArray(result.data)) {
      return result.data;
    } else {
      console.error("Data tidak ditemukan atau bukan array");
      return [];
    }
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
}

// Menambahn note ke API
async function addNote(title, body) {
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });

    if (!response.ok) {
      throw new Error('Failed to add note');
    }

    const result = await response.json();
    console.log('Note added successfully:', result);

    // Memperbarui list note
    await renderNotes();
  } catch (error) {
    console.error('Error adding note:', error);
  }
}

// Menambahkan Note ketika tombol submit ditekan
document.querySelector('#note-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.querySelector('#note-title').value;
  const body = document.querySelector('#note-body').value;

  addNote(title, body);
  document.querySelector('#note-title').value = '';
  document.querySelector('#note-body').value = '';
});

async function renderNotes() {
  const notesListElement = document.querySelector("#notesList");
  const notes = await getNote();
  console.log(notes);

  const listOfNoteItem = notes.map((noteData) => `
    <note-item
      id="${noteData.id}"
      title="${noteData.title}"
      body="${noteData.body}"
      createdAt="${noteData.createdAt}"
      archived="${noteData.archived}"
    ></note-item>
  `);

  notesListElement.innerHTML = listOfNoteItem.join("");
}

document.addEventListener('DOMContentLoaded', renderNotes);