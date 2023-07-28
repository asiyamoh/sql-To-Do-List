// Allows for resusable pool connection
// importing the pg package from node_modules
const pg = require('pg') 

const pool = new pg.Pool({
    // Name of DB
    database: '',
    // Stuff below this will remain the same for now
    host: 'localhost',
    port: 5432
})

module.exports = pool