// path
// const path = require('path');
// let pathObj = path.parse(__filename);
// console.log(pathObj);

// os
// const os = require('os');
// let totalMemory = os.totalmem();
// let freeMemory = os.freemem();
// console.log(`Total Memory: ${totalMemory}`);
// console.log(`Free Memory: ${freeMemory}`);

// fs, alwyas use async(no Sync behind method name)
// sync 同步，一次只作一件事
// async 非同步，各做各的，不用等待完成才進行下一步
// this is sync method
// const files = fs.readdirSync('./');
// console.log(files);
// const fs = require('fs');
// fs.readdir('./', function(err, files) {
//   if (err) {
//     console.log('Error', err);
//   } else {
//     console.log('Redulst', files);
//   }
// });

// events (learn with logger.js)
// const EventEmitter = require('events');
// const Logger = require('./logger');
// const logger = new Logger();

// logger.on('messageLogged', arg => {
//   console.log('Listener called', arg.id);
// });

// logger.log('message');

// http
const http = require('http');

const server = http.createServer(function(req, res) {
  if (req.url === '/') {
    res.write('Hello world');
    res.end();
  }

  if (req.url === '/api/courses') {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

server.on('connection', socket => {
  console.log('New connection');
});
server.listen(3000);

console.log('Listening on port 3000...');
