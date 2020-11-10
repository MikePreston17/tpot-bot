const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const createPaper = require('./api/paper');
require('dotenv').config()
const port = process.env.PORT || 8001

console.log('createPaper', createPaper)

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.get('/hello', (request, response) => response.send("hello world..."))
app.post('/api/paper', createPaper)

app.get('/', (_, response) => response.send("Could not find resource you're looking for..."))

app.listen(port, () => console.log(`listening on port: ${port}`))  