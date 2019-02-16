// const request = require('request');

// request(
//   {
//     url:
//       'https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia',
//     json: true,
//   },
//   (error, response, body) => {
//     console.log(body);
//   }
// );

import axios from 'axios';

// api:youtube.developers.google.com
const KEY = 'AIzaSyA7h91ACbuG6pzQ9ImYD98eF7ej78JSlxM';

export default axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/geocode/json?',
  query: {
    address: '1301%20lombard%20street%20philadelphia',
    key: KEY,
  },
});
