class NoteItem extends HTMLElement {
    connectedCallback() {
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