"use strict";
import Note from "./Note";
import EditField from "./EditField";

export default class NoteManager{
    constructor({el, editFieldEl, notes}) {
        this.el = el;
        this.editFieldEl = editFieldEl;

        this.notes = notes.map(note => new Note(note, this));

        this.onNewNote = () => {};
        this.onEditNote = () => {};
        this.onRemoveNote = () => {};

        this.renderNotes();
    }

    renderNotes(){
        this.el.innerHTML = '';
        this.notes.forEach(note => this.renderNote(note.getElement()));
    }

    renderNote(noteEl){
        this.el.append(noteEl);
    }

    removeNote(note){
        this.notes.splice(this.notes.indexOf(note), 1);
        this.renderNotes();
        this.onRemoveNote(note);
    }

    onShowNote(note){
        this.renderNotes();

        let editField = new EditField(note, this);
        let newEd = editField.getElement();

        this.editFieldEl.replaceWith(newEd);
        this.editFieldEl = newEd;
    }

    onEditTitle(note){
        note.title = this.editFieldEl.querySelector('.edit-field-title').innerText;
        this.onEditNote(note);
    }

    onEditBody(note){
        note.body = this.editFieldEl.querySelector('.edit-field-body').innerText;
        this.onEditNote(note);
    }

    addNote(note){
        const objNote = new Note(note, this);
        this.notes.unshift(objNote);
        this.renderNotes();
        this.onNewNote(objNote);
    }
}