const puppeteer = require('puppeteer');
const cheerio = require("cheerio")

async function main() {
    try {
        const browser = await puppeteer.launch({headless: false})
        const page = await browser.newPage()
        await page.goto("https://okbizcs.okwave.jp/login/");
        await page.type("input#userid", "michael_wong")
        await page.type("input#password", "12345678")
        await page.click("input.login_btn")
        await page.goto("https://okbizcs.okwave.jp/mypage/");

        const content = await page.content();
        const $ = await cheerio.load(content)
        console.log($("#answerPoint").text());

    } catch (error) {
        
    }
}

main()