module.exports = async (request, response) => {
    // console.log('body', request.body)

    // const { content, title, slug, author } = request.body;

    // await createPaper({ content, title });

    return response.send("Hello, World")
}