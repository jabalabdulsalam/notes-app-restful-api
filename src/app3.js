import "./styles/style.css";
import "./script/component/index.js";

const BASE_URL = "https://notes-api.dicoding.dev/v2/notes";

class NoteItem extends HTMLElement {
  connectedCallback() {
    // Attribute
    this.id = this.getAttribute("id");
    this.title = this.getAttribute("title");
    this.body = this.getAttribute("body");
    this.createdAt = this.getAttribute("createdAt");
    this.archived = this.getAttribute("archived");

    this.render();
  }

  render() {
    this.innerHTML = `
      <article class="note-item">
        <h3 class="note">
          <span class="note-upper">${this.title}</span>
        </h3>
        <div class="note__body">
          <div>${this.body}</div>
        </div>
        <div class="note__createdAt">
          <p>Dibuat : ${new Date(this.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}</p>
        </div>
        <div class="form-group">
        <button type="submit" id="btn_delete">Delete</button>
      </div>
      </article>
    `;
  }
}

customElements.define("note-item", NoteItem);

async function fetchNotes() {
  try {
    const response = await fetch(BASE_URL);
    const result = await response.json();

    // Pastikan result.data adalah array
    if (result.data && Array.isArray(result.data)) {
      return result.data; // Kembalikan array data
    } else {
      console.error("Data tidak ditemukan atau bukan array");
      return [];
    }
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
}

async function renderNotes() {
  const notesListElement = document.querySelector("#notesList");
  const notes = await fetchNotes();
  console.log(notes);

  // Map data menjadi elemen HTML
  const listOfNoteItem = notes.map((noteData) => {
    return `
      <note-item
        id="${noteData.id}"
        title="${noteData.title}"
        body="${noteData.body}"
        createdAt="${noteData.createdAt}"
        archived="${noteData.archived}"
      ></note-item>
    `;
  });
  // Masukkan elemen ke dalam DOM
  notesListElement.innerHTML = listOfNoteItem.join("");
}

// Panggil fungsi renderNotes ketika halaman dimuat
document.addEventListener('DOMContentLoaded', renderNotes);