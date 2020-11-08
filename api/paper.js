import { createPaper,  createPaperViaPlaywright } from '../_lib/createPaper'

module.exports = async (request, response) => {
    console.log('body', request.body)

    const { content, title, slug, author } = request.body;

    // await createPaper({ content, title });

    await  createPaperViaPlaywright({ content, title })

    return response.send(200)
}