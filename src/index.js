import { By } from "selenium-webdriver";

import { login, apply, manualApply } from "./lib/index.js";
import { waitFor, wait, applyLater, urlBuilder } from "./utils/index.js";

export default async function (driver, config) {
    await login(driver, config.login);
    let url = await driver.getCurrentUrl();
    const query = urlBuilder(config.jobDetails);
    url = url.split("/?")[0] + "/jobs" + query;
    await driver.get(url);
    await waitFor("ul.jobsearch-ResultsList");

    const getListings = async () =>
        await driver.findElements(By.css("ul.jobsearch-ResultsList>li"));

    let currentPage = 1;
    let listings = await getListings();

    for (let i = 0; i <= listings.length; i++) {
        if (i === listings.length) {
            let isEnd = await driver.findElements(
                By.css('a[data-testid="pagination-page-next"]')
            );
            isEnd = (await isEnd.length) === 0;
            if (isEnd) {
                console.log("No jobs left, checking saved ones.");
                if (applyLater.length > 0) {
                    console.log(
                        `${applyLater.length} jobs were skipped. Going manually now.`
                    );
                    for (let i = 0; i < applyLater.length; i++) {
                        await manualApply(driver, applyLater[i]);
                    }
                } else console.log("No saved jobs.");
                console.log("We are done here. Quitting.");
                await driver.quit();
                return;
            }
            currentPage = currentPage + 1;
            let nextPageButton = await driver.findElement(
                By.css('a[data-testid="pagination-page-next"]')
            );
            console.log(
                "End of page has been reached. Trying to go to the next page."
            );
            await nextPageButton.click();
            await wait(2000);
            listings = await getListings();
            await wait(1500);
            i = 0;
        }
        console.log(`Page ${currentPage} job #${i}:`);
        await apply(listings[i]);
        await wait(3000);
    }
}
