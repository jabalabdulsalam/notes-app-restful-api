const BASE_URL = "https://notes-api.dicoding.dev/v2";

function getAllNotes(){
    return fetch(`${BASE_URL}/notes`)
           .then(response => response.json())
           .then(data => data.notes);
}

async function addNote({id, title, body}){
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id, title, body}),
    };

    const response = await fetch(`${BASE_URL}/notes`, options);
    const responseJSON = await response.json();
    return responseJSON;
}

async function deleteNote(id){
    return fetch(`${BASE_URL}/notes/${note_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => data.notes);
}

export {getAllNotes, addNote, deleteNote};