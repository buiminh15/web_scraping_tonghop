# web_scraping_tonghop
* Using pupprteer to scrape website

### Request and Request-promise module
* Using **Request**, **Request-promise** to download webiste

* Get one element
```sh
async function main() {
    const html = await request.get("https://reactnativetutorial.net/css-selectors/")
    fs.writeFileSync("./test.html", html)

    const $ = await cheerio.load(html);
    const theText = $("h1").text();
    console.log(theText)
}

main();
```

* Get many elements
```sh
async function main() {
    const html = await request.get("https://reactnativetutorial.net/css-selectors/lesson2.html")
    fs.writeFileSync("./test.html", html)

    const $ = await cheerio.load(html);
    $("h2").each((index, element)=> {
        console.log($(element).text())
    })
}

main();
```

* Get element using ID
```sh
async function main() {
    const html = await request.get("https://reactnativetutorial.net/css-selectors/lesson3.html")
    fs.writeFileSync("./test.html", html)

    const $ = await cheerio.load(html);
    
    console.log($("h2#red").text())
}

main();
```

* Get element using Class
```sh
async function main() {
    const html = await request.get("https://reactnativetutorial.net/css-selectors/lesson4.html")
    fs.writeFileSync("./test.html", html)

    const $ = await cheerio.load(html);
    
    console.log($("h2.red").text())
}

main();
```

* Get element using HTML attributes
```sh

async function main() {
    const html = await request.get("https://reactnativetutorial.net/css-selectors/lesson6.html")
    fs.writeFileSync("./test.html", html)

    const $ = await cheerio.load(html);
    
    console.log($("[data-customer='22293']").text())
}

main();

```