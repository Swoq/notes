import "./scss/style.scss"
import NoteManager from "./NoteManager";

const noteManager = new NoteManager({
    el: document.querySelector('.notes'),
    editFieldEl: document.querySelector('.note-edit-field'),
    notes: onStart()
});

function onStart(){
    let notes = [];
    for (let i = '0'; i < 255; i++) {
        let raw = localStorage.getItem(i);
        if(raw != null)
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

window.addEventListener('popstate', function (e){
    noteManager.updateState(e.state);
})

function make_json_note({title, body}){
    return {
        title,
        body
    }
}