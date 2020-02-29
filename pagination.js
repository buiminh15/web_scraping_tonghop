const request = require("request-promise")
const cheerio = require("cheerio")

const url = "https://sfbay.craigslist.org/search/vol?s="
async function scrape() {
    for (let index = 0; index <= 360; index = index+120) {
        const htmlResult = await request.get(url + index);
        const $ = await cheerio.load(htmlResult)
        $(".result-title").each((index, element)=> {
            console.log($(element).text())
        })
        console.log("At page number " + index);
    }
}

scrape()








