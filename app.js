const notesList = document.getElementById('notesList');
        
// Load notes from localStorage on page load
window.onload = function() {
    loadNotes();
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
        createNoteCard(note, index);
    });
}

function createNoteCard(note, index) {
    const noteCard = document.createElement('div');
    noteCard.className = 'note-card';
    noteCard.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.description}</p>
        <button onclick="deleteNote(${index})">Delete</button>
    `;
    notesList.appendChild(noteCard);
}

function addNote() {
    const title = document.getElementById('noteTitle').value.trim();
    const description = document.getElementById('noteDescription').value.trim();

    if (!title || !description) {
        alert('Please fill in both the title and description.');
        return;
    }

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push({ title, description });
    localStorage.setItem('notes', JSON.stringify(notes));

    document.getElementById('noteTitle').value = '';
    document.getElementById('noteDescription').value = '';

    loadNotes();
}

function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
}