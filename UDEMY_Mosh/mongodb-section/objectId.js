// an id is generate by driver, not mongoDB
// we can get an id by just simply generate it

const mongoose = require('mongoose');
const id = mongoose.Types.ObjectId();
console.log(id);

// show time stamp
console.log(id.getTimestamp());
// show if id is valid
const isValid1 = mongoose.Types.ObjectId.isValid('1234'); // false
console.log(isValid1);
const isValid2 = mongoose.Types.ObjectId.isValid(id); // true
console.log(isValid2);
