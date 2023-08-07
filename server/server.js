const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Setup body parser - to translating request body into JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Serve "static assets" (html, css, client-side js)
// from the server/public folder
app.use(express.static('server/public'));


// Setup the todo router
// to respond to requests from the  URL
let todoRouter = require('./routes/todo.router.js');
app.use('/todo', todoRouter);

// Start express
app.listen(PORT, () => {
    console.log('up and running on port', PORT);
  });
