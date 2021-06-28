const fs = require('fs');
const yargs = require('yargs');
const notes = require('./notes');

//Customize yargs version
yargs.version('1.1.0');

yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Note Body",
            demandOption: true,
            type: 'string'
        }
    },
    handler: ({title, body}) => {
        notes.addNote({title, body});
    }
})


yargs.command({
    command: "remove",
    describe: "Remove a note",
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: ({title}) => {
        notes.removeNote(title);
    }
});

yargs.command({
    command: "read",
    describe: "Reads a note",
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: ({title}) => {
        let note = notes.getNotes().find(n => n.title === title);
        if(!note) {
           console.log('Note not found');
           return; 
        }

        console.log(`${title}:`);
        console.log(note.body);
    }
});

yargs.command({
    command: "list",
    describe: "Lists the notes",
    handler: () => {
        let noteList = notes.getNotes();
        if(noteList.length === 0) {
            console.log('You have no notes');
            return;
        }
        console.log('Your notes');
        noteList.forEach(n => {
            console.log(n.title);
        });
    }
});

yargs.parse();