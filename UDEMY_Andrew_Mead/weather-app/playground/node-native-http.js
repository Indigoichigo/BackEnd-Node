const https = require('https');

const url =
  'https://api.darksky.net/forecast/3c657e85eaab38bf03879e686a4d3936/37.8267,-122.4233?';

const request = https.request(url, res => {
  let data = '';

  res.on('data', chunk => {
    data += chunk.toString();
    console.log(chunk);
  });

  res.on('end', () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on('error', error => {
  console.log(error);
});

request.end();
