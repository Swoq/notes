export default class IndexView {
    constructor(noteManager) {
        window.addEventListener('hashchange', () => this.onRouteChange());
        this.noteManager = noteManager;
    }

    onRouteChange() {
        const hashLocation = window.location.hash.substring(1);
        this.loadContent(hashLocation);
    }

    loadContent(hash) {
        if (hash > this.noteManager.notes.length) {
            hash = 0;
            history.pushState(null, null, '#0');
            alert('There is no such note!\nRedirected to #0.')
        }

        let node = this.noteManager.notes[hash];
        this.noteManager.onShowNote(node);
    }
}