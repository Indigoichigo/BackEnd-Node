console.log('starting app.js');

// require: loading module

// stand for file system, is a build-in module
const fs = require('fs');

// stand for opreation system, is a build-in moduel
const os = require('os');

// import file
const notes = require('./notes.js');

var user = os.userInfo();
var res = notes.addNote();
console.log(res);

var addRes = notes.add(9, -2);
console.log('Result: ', addRes);

// import lodash library
const _ = require('lodash');
// using lodash library
console.log(_.isString('ha'));
console.log(_.isString(123));

// filter only value in array
let filteredArray = _.uniq(['Ray', 1, 2, 3, 3, 3, 3, 4, 'Ray', 5]);
console.log(filteredArray);

// 第一個參數，在哪個檔案做事
// 第二個參數，要寫入的資料
// 第三個參數，callback
fs.appendFileSync(
  'greetings.txt',
  `Hello ${user.username} ! You are ${notes.age}`
);
