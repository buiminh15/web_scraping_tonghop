const request = require("request-promise")
const cheerio = require("cheerio")
const fs = require("fs")

async function main() {
    const html = await request.get("https://reactnativetutorial.net/css-selectors/lesson6.html")
    fs.writeFileSync("./test.html", html)

    const $ = await cheerio.load(html);
    
    console.log($("[data-customer='22293']").text())
}

main();








