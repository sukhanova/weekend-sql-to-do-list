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

// routes
// post task
app.post('/task', (req, res) => { 
    const id = [req.body.task];
    console.log('in /tasks POST: ', req.body);
    const queryText = `INSERT INTO "tasklist" ("task") VALUES($1);`;
    pool.query(queryText, id).then((result) => { 
        res.sendStatus(201);
    }).catch((error) => { 
        console.log('ERROR with INSERT new task', error);
        res.sendStatus(500);
    })
})


// spin up server
app.listen(PORT, () => {
  console.log('server up on:', PORT);
});
