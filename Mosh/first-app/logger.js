// learn with app.js-event
const EventEmitter = require('events');

var url = 'http://mylogger.io/log';

class Logger extends EventEmitter {
  // don't need 'function' text in a class
  log(message) {
    // send an http request
    console.log(message);

    this.emit('messageLogged', { id: 1, url: 'http://' });
  }
}

module.exports = Logger;
