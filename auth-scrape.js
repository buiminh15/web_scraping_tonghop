const puppeteer = require('puppeteer');
const cheerio = require("cheerio")

async function main() {
    try {
        const browser = await puppeteer.launch({headless: false})
        const page = await browser.newPage()
        await page.goto("https://accounts.craigslist.org/login");
        await page.type("input#inputEmailHandle", "wacodoj100@oppamail.com")
        await page.type("input#inputPassword", "Qq122!@")
        await page.click("button#login")
        await page.goto("https://accounts.craigslist.org/login/home?show_tab=billing");

        const content = await page.content();
        const $ = await cheerio.load(content)
        console.log($("body > article > section > fieldset > b").text());

    } catch (error) {
        
    }
}

main()