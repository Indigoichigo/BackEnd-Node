const fs = require('fs');

let fetchNotes = () => {
  try {
    let notesString = fs.readFileSync('notes-data.json');
    return (notes = JSON.parse(notesString));
  } catch (e) {
    return [];
  }
};

let saveNotes = notes => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

let addNote = (title, body) => {
  let notes = fetchNotes();
  let note = {
    title,
    body,
  };

  let dulpicateNotes = notes.filter(item => item.title === title);

  if (dulpicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

let getAll = () => {
  return fetchNotes();
};

let getNote = title => {
  let getCurrentNotes = fetchNotes();
  let findNote = getCurrentNotes.find(item => title === item.title);
  return findNote;
};

let removeNote = title => {
  let getCurrentNotes = fetchNotes();
  let filteredNotes = getCurrentNotes.filter(item => title !== item.title);
  saveNotes(filteredNotes);

  return getCurrentNotes.length !== filteredNotes.length;
};

let logNote = note => {
  console.log('---');
  console.log(`title: ${note.title}`);
  console.log(`body: ${note.body}`);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote,
};
