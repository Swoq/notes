import "./scss/style.scss"
import NoteManager from "./NoteManager";
import IndexView from "./IndexView";

const noteManager = new NoteManager({
    el: document.querySelector('.notes'),
    editFieldEl: document.querySelector('.note-edit-field'),
    notes: onStart()
});

new IndexView(noteManager);

function onStart() {
    let notes = [];
    for (let i = '0'; i < 255; i++) {
        let raw = localStorage.getItem(i);
        if (raw != null)
            notes.unshift(JSON.parse(raw));
    }
    return notes;

}

noteManager.onNewNote = (note) => {
    localStorage.setItem(note.id, JSON.stringify(make_json_note(note)));
    console.log("Note added ", note.id);
};

noteManager.onEditNote = (note) => {
    localStorage.setItem(note.id, JSON.stringify(make_json_note(note)));
    console.log("Note changed ", note.id);
};

noteManager.onRemoveNote = (note) => {
    localStorage.removeItem(note.id);
    console.log("Note removed ", note.id);
};


const newNoteBtn = document.querySelector('.new-note-btn');
newNoteBtn.onclick = () => {
    noteManager.addNote({
        title: '',
        body: ''
    })
};

const saveNoteBtn = document.getElementById('saveBtn');
saveNoteBtn.onclick = () => {
    noteManager.renderNotes();
};

function make_json_note({title, body}){
    return {
        title,
        body
    }
}