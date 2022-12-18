import { By, until } from "selenium-webdriver";
import { driver } from "../../main.js";
import {
    waitFor,
    wait,
    tabPicker,
    isOneStep,
    setApplyLater,
} from "../utils/index.js";

const apply = async (job) => {
    try {
        let easyApply = await job.findElements(By.css("td.indeedApply"));
        easyApply = await easyApply.length;
        easyApply = easyApply > 0;
        if (!easyApply) {
            // TODO: write skipped postings to a file?
            console.log("No easy apply, skipping...");
            return;
        }
        await job.click();
        await driver.wait(
            until.elementLocated(By.css("h1.jobsearch-JobInfoHeader-title")),
            15000
        );
        let isAvailable = await driver.findElements(
            By.css(".jobsearch-IndeedApplyButton-buttonWrapper")
        );
        isAvailable = await isAvailable.length;
        isAvailable = isAvailable > 0;
        if (!isAvailable) {
            console.log("Already applied, skipping...");
            return;
        }
        const originalWindow = await driver.getWindowHandle();
        await driver.wait(
            until.elementsLocated(
                By.css("div.jobsearch-IndeedApplyButton-buttonWrapper>button")
            ),
            15000
        );
        const applyButton = await driver.findElement(
            By.css("div.jobsearch-IndeedApplyButton-buttonWrapper>button")
        );

        let windows = await driver.getAllWindowHandles();
        await tabPicker(originalWindow, windows, applyButton);
        windows = await driver.getAllWindowHandles();

        await waitFor(".ia-Navigation-container");
        const text = await driver
            .findElement(By.css(".ia-Navigation-container"))
            .getText();

        if (!isOneStep(text)) {
            // TODO: write skipped posting to a file?
            console.log("This job has more than 1 step, saving for later...");
            await driver.close();
            await driver.switchTo().window(originalWindow);
            await wait(1000);
            const jobToSave = await job
                .findElement(By.css("a"))
                .getAttribute("href");
            setApplyLater(jobToSave);
            console.log("Saved for later: ", jobToSave);
            return;
        }

        let continueButton = await driver.findElement(
            By.css("button.ia-continueButton")
        );

        await wait(2500);
        try {
            continueButton = await driver.findElement(
                By.css("button.ia-continueButton")
            );
            await continueButton.click();
        } catch (error) {
            console.log(
                "error in click: ",
                error,
                "refreshing and trying again..."
            );
            await driver.navigate().refresh();
            await wait(1500);
            await continueButton.click();
        }
        await wait(1000);
        // TODO: write successfull applications to a file? (keep count?)
        console.log(`Successfully applied! \n\n`);
        await driver.close();
        await driver.switchTo().window(originalWindow);
    } catch (error) {
        console.log("error during application process: ", error);
    }
};

export default apply;
