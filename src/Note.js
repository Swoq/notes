"use strict";
export default class Note {

    constructor({id, title, body, date}, noteManager) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.date = new Date(date);

        this.el = null;
        this.notesManager = noteManager;
    }

    getElement() {
        const tpl = this.getTemplate();
        const tmpDiv = document.createElement('div');

        const cutTime = (this.date.toLocaleDateString('en-GB') + ' ' + this.date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }));

        tmpDiv.innerHTML = tpl.replace('{{title}}', this.title)
            .replace('{{body}}', this.body).replace('{{date}}', cutTime);

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
                        <div class="note-date">
                        {{date}}
                        </div>
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
        const iEl = btnClose.getElementsByTagName('I');

        this.el.addEventListener('click', (e) => {
            if (e.target !== iEl[0])
                this.notesManager.onShowNote(this);
        });

        btnClose.onclick = () => {
            this.notesManager.removeNote(this);
        }
    }
}