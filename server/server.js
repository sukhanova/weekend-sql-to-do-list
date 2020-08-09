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
        console.log('ERROR with INSERT:', error);
        res.sendStatus(500);
    })
})

// get all tasks from db
app.get('/tasks', (req, res) => { 
    console.log('in /tasks GET');
    const queryText = `SELECT * from "tasklist" 
    ORDER BY lower(task);`;
    pool.query(queryText).then((results) => { 
        res.send(results.rows);
    }).catch((error) => { 
        console.log('ERROR with GET:', error);
        res.sendStatus(500);
    })
})

// delete task from db
app.delete('/tasks/:id', (req, res) => { 
    console.log('in tasks/delete', req.params.id);
    const value = [req.params.id];
    const queryText = `DELETE FROM "tasklist" WHERE id=$1;`;
    pool.query(queryText, value).then((response) => { 
        res.sendStatus(200);
    }).catch((error) => { 
        console.log('ERROR with DELETE:', error);
        res.sendStatus(500);
    })
})

app.put('/tasks/:id', (req, res) => {
    console.log('in tasks/put', req.params.id);
    const value = [req.params.id];
    const queryText = `UPDATE "tasklist" SET "complete" = 'YES'
    WHERE "id" = $1;`;
    pool.query(queryText, value).then((response) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('ERROR with UPDATE:', error);
        res.sendStatus(500);
    })
})


// spin up server
app.listen(PORT, () => {
  console.log('server up on:', PORT);
})
