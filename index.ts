import { Browser, Page } from "./node_modules/@types/puppeteer";
import { Helper } from "./puppeteerHelper";
import { CsvParser } from 'csv-parser';
import cron = require('node-cron');
import fs = require('fs');
import { PathLike } from 'fs';
import express = require('express');
import cors = require('cors')

class Startup {

    readonly fileName: PathLike;
    readonly port: number;

    constructor() {
        this.fileName = "titles.json";
        this.port = 7001;
    }

    public async main() {

        //start once and then every 12 hours
        let results = await this.start();

        //every 12 hours
        cron.schedule('0 0 */12 * *', async () => {
            console.log(`Let's go!`);
            let results = await this.start();
        });

        //start a server
        this.startServer();
    }

    startServer() {
        var corsOptions = {
            origin: 'https://www.0browser.com',
            optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
        }

        const app: express.Application = express();

        //enable CORS for prod only
        if (this.isProd())
            app.use(cors(corsOptions));

        let fileName = this.fileName;
        let port = this.port;

        app.get('/', (req, res) => {
            fs.readFile(fileName, 'utf8', function (err, data) {
                if (err)
                    throw err;

                res.json(JSON.parse(data));
            });
        });

        app.listen(port, function () { console.log(`App is listening on port ${port}!`); });

    }

    async save(results: Array<any>, fileName: PathLike) {
        //lets save it to disk, prettify
        fs.writeFile(fileName, JSON.stringify(results, null, '\t'), function (err) {
            if (err)
                throw err;

            console.log(`${fileName} Saved!`);
        });
    }

    async start(): Promise<Array<any>> {

        console.log(`UTC now: ${new Date().toUTCString()}`);        

        let helper = new Helper();
        await helper.init();
        let page = await helper.goto('https://google.com');

        await page.type('#tsf > div:nth-child(2) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input', 'Toilet paper');

        await helper.pressEnter();

        //go to shopping tab
        await helper.clickAjax("#hdtb-msb-vis > div:nth-child(2) > a");

        let results: Array<any> = new Array<any>();

        for (let index = 2; index <= 6; index++) {
            let toiletPapers = await this.scrape(helper, page, index);
            results = results.concat(toiletPapers);
        }

        console.log('all: ' + results.length);

        //we are done
        await helper.close();

        this.save(results, this.fileName);

        return results;
    }

    async scrape(helper: Helper, page: Page, pageNumber: number): Promise<Array<any>> {

        //only first time
        if (pageNumber == 2) {
            //select new items (from filters)
            await helper.clickAjax("#leftnavc > div > div > div:nth-child(7) > div.RhVG3d > div > div > div.EQ4p8c.CyAbL.HNgvTe");

            //select Free Shipping (from filters)
            page = await helper.clickAjax("#leftnavc > div > div > div:nth-child(8) > div.RhVG3d > div > div > div");

            //Open the Sort By filter by clicking on it
            await page.click("#taw > div:nth-child(1) > div > div > div > div.vylwkd > g-dropdown-menu");

            //select Review Score        
            await helper.clickAjax("#lb > div > g-menu > g-menu-item:nth-child(2)");
        }

        if (!this.isProd())
            await page.screenshot({ path: `capture${pageNumber}.png`, fullPage: true });

        //this is what we were looking for
        //lets extract toilet paper info from this page
        let results = await page.evaluate(() => {

            var elements = Array.from(document.querySelectorAll('div.sh-dlr__list-result'));
            var results = [];
            console.log(`length ${elements.length}`);
            for (let i = 0; i < elements.length; i++) {
                const currentNode = elements[i];

                var title = currentNode.querySelector('.mASaeb');
                var image = currentNode.querySelector('.sh-dlr__thumbnail img');
                var price = currentNode.querySelector('.ZGFjDb span[aria-hidden="true"]');
                var sellerUrl = title.querySelector('a').getAttribute("href");

                console.log(title.textContent);
                results[i] = { 'title': title.textContent, 'imageData': image.getAttribute("src"), 'price': price.textContent, 'sellerUrl': `https://www.google.com${sellerUrl}` };
            }
            return results;
        });

        //next page        
        let selector = `a[aria-label="Page ${pageNumber}"]`;
        const element = await page.$(selector);
        console.log("element: " + element);
        console.log("selector: " + selector);
        await helper.clickAjax(selector);

        if (!this.isProd())
            await page.screenshot({ path: `capture${pageNumber}-after.png`, fullPage: true });

        console.log(`a length: ${results.length}`);

        return results;
    }

    isProd(): boolean {
        return process.env.NODE_ENV === "production";
    }

}

//start the app
new Startup().main();