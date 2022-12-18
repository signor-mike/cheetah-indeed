import { driver } from "../../main.js";
import { By, until } from "selenium-webdriver";

const waitFor = async (selector, timeout = 15000) =>
    await driver.wait(until.elementLocated(By.css(selector)), timeout);

const wait = async (timeout = 15000) => {
    await new Promise((resolve) => setTimeout(resolve, timeout));
};

export { waitFor, wait };
