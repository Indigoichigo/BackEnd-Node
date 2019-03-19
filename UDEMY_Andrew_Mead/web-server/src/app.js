const express = require('express');

const app = express();

app.get('', (req, res) => {
  res.send('<h2>hello express</h2>');
});

// send an object, will return to a json
app.get('/help', (req, res) => {
  res.send({
    name: 'John',
    age: 25,
  });
});

app.get('/about', (req, res) => {
  res.send('page about');
});

app.get('/weather', (req, res) => {
  res.send('page weather');
});

app.listen(3000, () => {
  console.log('listening port 3000...');
});
