const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes.js');

// tell developer how to use this function
// $ node app)b.js add --help
const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't',
};

const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b',
};

const argv = yargs
  .command('add', 'Add a new Note', {
    title: titleOptions,
    body: bodyOptions,
  })
  .command('remove', 'Remove a Note', {
    title: titleOptions,
  })
  .command('read', 'Get a Note', {
    title: titleOptions,
  })
  .command('list', 'Show all notes')
  .help().argv;

let command = argv._[0];
console.log('Command: ', command);

let note = {};
switch (command) {
  case 'add':
    note = notes.addNote(argv.title, argv.body);
    if (note) {
      console.log('created note success');
      notes.logNote(note);
    } else {
      console.log('note title already exist');
    }
    break;
  case 'remove':
    let noteRemove = notes.removeNote(argv.title);
    let message = noteRemove ? `remove ${argv.title}` : `nothing remove`;
    console.log(message);
    break;
  case 'read':
    note = notes.getNote(argv.title);
    if (note) {
      console.log('find notes');
      notes.logNote(note);
    } else {
      console.log('note not found');
    }
    break;
  case 'list':
    let allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach(item => notes.logNote(item));
    break;
  default:
    console.log('Command not recognized');
    break;
}

// use node to debug
// $ node inspect [file name]
// use 'n' to go next line
// use 'c' to continue
// 'repl' mode can code and compile immediatelly on terminal

// use chrome to debug
// $ node --inspect-brk [file name]
// then open chrome type chrome://inspect on URL bar
