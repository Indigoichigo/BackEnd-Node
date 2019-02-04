// convert obj to json format
let obj = {
  name: 'Ray',
};
let stringObj = JSON.stringify(obj);
console.log(typeof stringObj); // string
console.log(stringObj);

console.log('------------------------------');

// parse json format to obj
let personString = '{"name":"Ray","age":25}';
let personObj = JSON.parse(personString);
console.log(typeof personObj); //object
console.log(personObj);

console.log('------------------------------');

// ---------------------------------------------

const fs = require('fs');

let originalNote = {
  title: 'Some title',
  body: 'Some body',
};

let originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('notes.json', originalNoteString);

let noteString = fs.readFileSync('notes.json');
let note = JSON.parse(noteString);
console.log(typeof note);
console.log(note.title);
