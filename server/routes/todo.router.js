const pool = require("../modules/pool.js");
const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    // Do a query to select all task from todo table
    console.log('insde the GET');
    let queryText = `SELECT * FROM "TODO"; `;

    // Use the pool to connect with DB
    pool.query(queryText)
        .then((result) => {
            // console.log(result)
            res.send(result.rows)
        }).catch((error) => {
            console.log("Error on GET", error)
            res.sendStatus(500)
        })
});

router.post('/', (req,res) => {
    console.log('req.body:', req.body)

    const task = req.body.task
    const isComplete = req.body.isComplete

    const queryParams = [task,isComplete]
    const queryText = `INSERT INTO "TODO" 
                ("task", "isComplete") 
                VALUES ($1, $2);`;
    pool.query(queryText, queryParams)
        .then((result)  => {
            console.log('Pool query is working');
            res.sendStatus(201)
        }).catch((error) => {
            console.log("Error on POST", error);
            res.sendStatus(500)
        })
})

router.delete('/:id', (req,res) =>{
    const deleteId = req.params.id;
    console.log("id to delete is:", deleteId)

    let queryText = `DELETE FROM "TODO" 
    WHERE "id" = $1;`

    let queryParams = [deleteId];

    pool.query(queryText,queryParams)
        .then((response)  => {
            res.sendStatus(200)
        }).catch((error) => {
            res.sendStatus(500)
        })
})

router.put('/:id', (req,res) => {
    const taskId = req.params.id;
   
    const queryText = `UPDATE "TODO" 
    SET "isComplete" = NOT "isComplete" 
    WHERE "id"=$1;`

    const queryParams = [taskId];

    pool.query(queryText, queryParams)
        .then((response) => {
            res.sendStatus(200)
        }).catch((error) => {
            res.sendStatus(500);
        })
})


module.exports = router;