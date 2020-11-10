// import { createPaper, createPaperViaPlaywright } from '../_lib/createPaper'
const { createPaperViaPlaywright, createPaper } = require('../_lib/createPaper.js')

module.exports = async (request, response) => {
    console.log('body', request.body)

    const { content, title, slug, author } = request.body;

    await createPaper({ content, title });
    // await createPaperViaPlaywright({ content, title })

    return response.sendStatus(200)
}