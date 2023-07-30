const pool = require("../modules/pool.js");
const express = require("express");
// Check the Name 🔽
const router = express.Router();

router.get('/todo', (req, res) => {
    // Do a query to select all task from todo table
    console.log('insde the GET');
    let queryText = `SELECT * FROM "TODO"; `;

    // Use the pool to connect with DB
    pool.query(queryText)
        .then((result) => {
            // console.log(result)
            res.send(result.rows)
        })
        .catch((error) => {
            console.log("Error on GET", error)
            res.sendStatus(500)
        })
});

router.post('/todo', (req,res) => {
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

router.put('/todo/:id', (req,res) =>{
    console.log("req.parms:", req.params)

    let isCompleteId = req.params.id;
    let queryParams = []
})




module.exports = router;