// debug is a package to replace console.log, it's more easy to use
const startupDebugger = require('debug')('app:db');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.use('/api/courses', courses); // if any api match to first argument, use courses
app.use('/', home);

// use xxx.use() for middleware
// express build-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // key=value
app.use(express.static('public')); //read file

// third-part middleware
app.use(helmet());

//configuration
console.log('application name: ' + config.get('name'));
console.log('mail server: ' + config.get('mail.host'));
console.log('mail password: ' + config.get('mail.password'));

// export NODE_ENV=production won't show 'Morgen enabled'
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  // console.log('Morgen enabled...');
  startupDebugger('Morgen enabled...');
}

// db work...
app.use(logger);

// now, if we command 'export PORT=5000', then run this file
// app will listen port 5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
