// includes
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pool = require('./modules/pool');

// uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// globals
const PORT = 5000;

// spin up server
app.listen(PORT, () => {
  console.log('server up on:', PORT);
});
