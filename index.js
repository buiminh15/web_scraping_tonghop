// const request = require("request-promise")
const cheerio = require("cheerio")
const ObjectsToCsv = require('objects-to-csv');
const request = require('requestretry').defaults({fullResponse: false})

const url = "https://sfbay.craigslist.org/d/software-qa-dba-etc/search/sof"
const scrapeSample = {
    title: 'Technical Writer for Web based application',
    description: 'We are looking for a talented, intelligent and enthusiastic Technical Writer who is serious about changing the FinTech landscape. ',
    datePosted: new Date('2020-02-27'),
    url: 'https://sfbay.craigslist.org/nby/sof/d/santa-rosa-technical-writer-for-web/7083625930.html',
    hood: 'san mateo',
    address: '123 street Parker',
    compensation: '23/hr'
}
const scrapeResults= [];

async function scrapeJobHeader() {
    try {
        const htmlResult = await request.get(url);
        const $ = await cheerio.load(htmlResult)
        $(".result-info").each((index, el) => { 
            const resultTitle = $(el).children(".result-title");
            const title = resultTitle.text();
            const datePosted = $(el).children("time").attr("datetime");
            const url = resultTitle.attr("href")
            const hood = $(el).find(".result-hood").text();
            const scrapeResult = {title, datePosted, url, hood,}
            scrapeResults.push(scrapeResult )
        })

        return scrapeResults;
    } catch (error) {
        console.error(error)
    }
}

async function scrapeDescription(jobWithHeaders) {
    return await Promise.all(
        jobWithHeaders.map(async job => {
            try {
                const htmlResult = await request.get(job.url)
                const $ = await cheerio.load(htmlResult)
                $(".print-qrcode-container").remove()
                job.description = $("#postingbody").text()
                job.address = $("div.mapaddress").text()
                const compensationText = $(".attrgroup")
                    .children()
                    .first()
                    .text()
                job.compensation = compensationText.replace("compensation: ", "")
                return job;
            } catch (error) {
                console.log(error);
            }
        })
    )
}

async function scrapeCraigslist() {
    const jobWithHeaders = await scrapeJobHeader();
    const jobsFullData = await scrapeDescription(jobWithHeaders);
    createCSVFile(jobsFullData)

}

async function createCSVFile(data) {
    const csv = new ObjectsToCsv(data);
 
    // Save to file:
    await csv.toDisk('./test.csv');

}


scrapeCraigslist()