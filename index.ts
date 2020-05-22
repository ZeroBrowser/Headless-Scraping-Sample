import { Browser, Page } from "./node_modules/@types/puppeteer";
import { Helper } from "./puppeteerHelper";
import { CsvParser } from 'csv-parser';
import fs = require('fs');

class Startup {
    public async main() {

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

        //lets save it to disk, prettify
        fs.writeFile("titles.json", JSON.stringify(results, null, '\t'), function (err) {
            if (err) throw err;
            console.log("Saved!");
        });
    }

    async scrape(helper: Helper, page: Page, pageNumber: number): Promise<Array<any>> {

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

        await page.screenshot({ path: `capture${pageNumber}.png`, fullPage: true });

        //this is what we were looking for
        //lets extract toilet paper info from this page
        let titles = await page.evaluate(() => {

            var elements = Array.from(document.querySelectorAll('div.sh-dlr__list-result'));
            var results = [];
            console.log(`length ${elements.length}`);
            for (let i = 0; i < elements.length; i++) {
                const currentNode = elements[i];
                var title = currentNode.querySelector('.mASaeb');
                console.log(title.textContent);
                results[i] = title.textContent;
            }
            return results;
        });

        //next page        
        let selector = `a[aria-label="Page ${pageNumber}"]`;
        const element = await page.$(selector);
        console.log("element: " + element);
        console.log("selector: " + selector);
        await helper.clickAjax(selector);

        await page.screenshot({ path: `capture${pageNumber}-after.png`, fullPage: true });

        console.log(`a length: ${titles.length}`);

        return titles;
    }


}

new Startup().main();