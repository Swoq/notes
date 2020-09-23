"use strict";
export default class Note{
    static global_id = '0';

    constructor({title, body}, noteManager) {
        this.id = Note.global_id++;

        this.title = title;
        this.body = body;
        this.el = null;
        this.notesManager = noteManager;
    }

    getElement(){
        const tpl = this.getTemplate();
        const tmpDiv = document.createElement('div');
        tmpDiv.innerHTML = tpl.replace('{{title}}', this.title)
            .replace('{{body}}', this.body);

        this.el = tmpDiv.children[0];

        this.attachEventListeners();

        return this.el;
    }

    getTemplate(){
        return `<div class="note">
                    <div class="note-header">
                        <span class="note-close">
                            <i class="fas fa-times"></i>
                        </span>
                    </div>
                    <div class="note-title">
                        {{title}}
                    </div>
                    <div class="note-body">
                        {{body}}
                    </div>
                </div>`;
    }

    attachEventListeners(){
        const btnClose = this.el.querySelector('.note-close');

        this.el.addEventListener('click', () => {
            history.pushState(null, null, ('#' + this.id));
            this.notesManager.onShowNote(this);
        });

        btnClose.onclick = () => {
            this.notesManager.removeNote(this);
        }
    }
}