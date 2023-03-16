import { By } from "selenium-webdriver";
import { createInterface } from "readline";
import { waitFor } from "../utils/index.js";

const askQuestion = (query) => {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(`Processing: \n${query}\nSkip? (y/enter)`, async (ans) => {
            rl.close();
            resolve(ans);
        });
    });
};

const manualApply = async (driver, job) => {
    try {
        await driver.switchTo().newWindow("tab");
        await driver.get(job);
        await waitFor("div.jobsearch-JobInfoHeader-title-container");
        let isAvailable = await driver.findElements(
            By.css("span.indeed-apply-status-not-applied")
        );
        isAvailable = await isAvailable.length;
        isAvailable = isAvailable > 0;
        if (!isAvailable) {
            console.log("Already applied, skipping...");
            return;
        }
        const answer = await askQuestion(job);
        if (answer === "y") return;

        // TODO: wait for apply and click it
        await waitFor("button.ia-continueButton", 900000);
        await driver.findElement(By.css("button.ia-continueButton")).click();
        await waitFor("div.ia-PostApply-header", 900000);
        console.log("Successfully applied!\n\n");
        await driver.close();
        // switch back to original window
        const windows = await driver.getAllWindowHandles();
        await driver.switchTo().window(windows[0]);
    } catch (error) {
        console.log("Error in apply-manual: ", error.message);
    }
};

export default manualApply;
