const pool = require("../modules/pool.js");
const express = require("express");
// Check the Name 🔽
const router = express.Router();

router.get('/', (req, res) => {
    // Do a query to select all task from todo table
    console.log('insde the GET');
    let queryText = `SELECT * FROM "TODO"; `;

    // Use the pool to connect with DB
    pool.query(queryText)
        .then((result) => {
            console.log(result)
            res.send(result.rows)
        })
        .catch((error) => {
            console.log("Error on GET", error)
            res.sendStatus(500)
        })
});

module.exports = router;