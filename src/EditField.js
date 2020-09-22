export default class EditField {
    constructor(note, noteManager) {
        this.note = note;
        this.el = null;
        this.notesManager = noteManager;
    }

    getElement(){
        const tpl = this.getTemplate();
        const tmpDiv = document.createElement('div');
        tmpDiv.innerHTML = tpl.replace('{{title}}', this.note.title)
            .replace('{{body}}', this.note.body);

        this.el = tmpDiv.children[0];

        this.attachEventListeners();

        return this.el;
    }

    getTemplate(){
        return `<div class="note-edit-field">
            <div class="edit-field-title" contenteditable="true">
                {{title}}
            </div>
            <div class="edit-field-body" contenteditable="true" >
                {{body}}
            </div>
        </div>`;
    }

    attachEventListeners(){
        const titleEl = this.el.querySelector('.edit-field-title');
        const bodyEl = this.el.querySelector('.edit-field-body');

        titleEl.addEventListener('input', () => {
            this.notesManager.onEditTitle(this.note);
        });

        bodyEl.addEventListener('input', () => {
            this.notesManager.onEditBody(this.note);
        });

    }

}