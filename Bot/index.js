// TODO: refactor the logic as a Bot class, seen here: https://github.com/03balogun/instagram-bot/blob/master/Bot/index.js
// Add those nice configs, too.

const dotenv = require('dotenv')
dotenv.config()
const puppeteer = require('puppeteer');

let userName = process.env.WPUSER //'michael.n.preston@gmail.com'
let password = process.env.WPPASS //'Mercury2020!!'

let screenshotsDir = '/screenshots'
async function createPage(paper) {

    const browser = await puppeteer.launch({
        headless: false
        // , slowMo: 250
    })
    // Give permission to the browser to copy/paste
    await browser.defaultBrowserContext().overridePermissions('https://www.thepathoftruth.com', ['clipboard-read', 'clipboard-write']);

    const page = await browser.newPage();

    await page.setViewport({ width: 1500, height: 764 })
    // await page.goto('https://www.thepathoftruth.com/wp-admin/');
    await page.goto('https://www.thepathoftruth.com/wp-admin/post-new.php?post_type=page') // Go straight to new-page route right after login success.

    await page.screenshot({ path: screenshotsDir + 'wp-admin-load.png' })

    /** Log In as Me */
    // Set credentials:
    await page.evaluate(val => document.querySelector('#user_login').value = val, userName).catch(handleError)
    await page.evaluate(val => document.querySelector('#user_pass').value = val, password).catch(handleError)

    await page.click('input[type="submit"]');

    await page.screenshot({ path: screenshotsDir + 'wp-login.png' })

    /** Paste raw HTML from editor */
    let content = paper.content || '<h1>This post was created by Puppeteer JS</h1>'
    let pageNum = " " + Math.floor(Math.random() * 50)
    let title = (paper.title || 'Puppeteer Test Page') + pageNum


    // Click 'Add new Page' menu item:
    // await page.hover('#menu-pages > a > div.wp-menu-name') // hover over pages menu
    // await page.click('#menu-pages > ul > li:nth-child(3) > a') // click on 'add new page' menu item //FIXME: incorrect selector!

    // Toggle Text mode as HTML (not Visual):
    await page.click('#content-html')

    // Paste title and content:
    await page.evaluate(val => document.querySelector('#content').value = val, content).catch(handleError)
    await page.evaluate(val => document.querySelector('#title').value = val, title)

    // Save as Draft:
    await page.click('#save-post')

    await page.screenshot({ path: screenshotsDir + 'wp-paste-contents.png' })

    await browser.close();
}

function handleError(error) {
    console.error(error)
}

module.exports = {
    createPage
}