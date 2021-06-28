const fs = require('fs');

const getNotes = () => {
    return loadNotes();
}

const addNote = (note) => {
    const notes = loadNotes();
    const duplicates = notes.filter(n => n.title === note.title);
    if(duplicates.length >= 1) {
        console.log('A note with the title',note.title,'already exists');
        return;
    }

    notes.push(note);
    saveNotes(notes);
    console.log('New note added!');
}

const removeNote = (title) => {
    const notes = loadNotes();
    const filteredNotes = notes.filter(n => n.title != title);
    if(notes.length == filteredNotes.length) {
        console.log('Note with the title', title, 'does not exist!');
        return;
    }
    
    saveNotes(notes);
    console.log(title, 'removed!');
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson  = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch(e) {
        return [];
    }
}

const saveNotes = (notes) => {
    try {
        const data = JSON.stringify(notes);
        fs.writeFileSync('notes.json',data);
    } catch(e) {

    }
}

module.exports = {
    loadNotes,
    saveNotes,
    removeNote,
    getNotes,
    addNote
}