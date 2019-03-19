const request = require('request');

const url =
  'https://api.darksky.net/forecast/3c657e85eaab38bf03879e686a4d3936/37.8267,-122.4233?';

request({ url: url, json: true }, (error, res) => {
  const data = JSON.parse(res.body);
  console.log(data.currently);
});
