const express = require('express');
const router = express.Router();

// first arg = url(path)
router.get('/', (req, res) => {
  res.render('index', { title: 'my express app', message: 'hello' });
  // res.send('hello node!!');
});

module.exports = router;
