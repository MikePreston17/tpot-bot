const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const { createPage } = require('../Bot');
require('dotenv').config()
const port = process.env.PORT || 8001

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.get('/hello', (request, response) => response.send("hello world..."))
app.post('/paper', async (request, response) => {
    console.log('body', request.body)

    const { content, title, slug, author } = request.body;

    await createPage({ content, title });

    return response.sendStatus(200)
})
// .then(() => {
//     console.log('Finished post!')
// })

app.get('/', (_, response) => response.send("Could not find resource you're looking for..."))

app.listen(port, () => console.log(`listening on port: ${port}`))  