import { driver } from "../../main.js";
import { wait } from "./index.js";

const tabPicker = async (originalWindow, windows, button) => {
    do {
        console.log("Have not applied yet, trying to click apply...");
        await button.click();
        await wait(3000);
        windows = await driver.getAllWindowHandles();
        if (windows.length < 2) console.log("Click has failed, trying again.");
    } while (windows.length < 2);
    if (windows.length > 2) {
        console.log("Too much tabs, closing them.");
        for (let i = 0; i < windows.length; i++) {
            if (windows[i] === originalWindow || i === 1) continue;
            await driver.switchTo().window(windows[i]);
            await driver.close();
        }
    }
    await wait(2500);
    await driver.switchTo().window(windows[1]);
};

const isOneStep = (str) =>
    str.split(" ").filter((char) => char === "1").length === 2;

export { tabPicker, isOneStep };
