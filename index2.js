const request = require("request-promise")
const cheerio = require("cheerio")

const url = "https://chiebukuro.yahoo.co.jp/category/2078297369/question/list"
const url1 = "https://sfbay.craigslist.org/d/farm-garden/search/sfc/gra"

const scrapeSample = {
    title: 'Technical Writer for Web based application',
    datePosted: new Date('2020-02-27'),
    image: 'https://images.craigslist.org/00I0I_4YHRVKFD9MB_300x300.jpg',
    url: 'https://sfbay.craigslist.org/nby/sof/d/santa-rosa-technical-writer-for-web/7083625930.html',
    price: '$4',
    hood: 'soma'
}

var scrapeResults = [{ title: '12433' }];

async function scrapeData() {
    try {
        const htmlResult = await request.get(url1);
        const $ = await cheerio.load(htmlResult);
        $(".result-info").each((index, el) => {
            const resultTitle = $(el).children(".result-title");
            const title = resultTitle.text();
            const datePosted = new Date($(el).children("time").attr("datetime"))
            const url = $(el).children("a").attr("href");
            const price = $(el).find(".result-price").text();
            const hood = $(el).find(".result-hood").text().replace(/([.*+?^$|(){}\[\]])/mg, "");;
            
            const scrapeResult = { title, datePosted, url, price, hood }
            scrapeResults.push(scrapeResult)
        })
        return scrapeResults;
    } catch (error) {
        console.error(error);
    }
}

async function scrapeImage() {
    try {
        const htmlResult = await request.get(url1);
        const $ = await cheerio.load(htmlResult);
        $('[data-index="0"]').each((index, element)=> {
            const image = $(element).children("img").attr("src")
            console.log(image);
        }) 
    } catch (error) {
        console.error(error);
    }
}
scrapeImage();