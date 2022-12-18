import { By, Key } from "selenium-webdriver";
import { waitFor } from "../utils/index.js";

const login = async (driver, config = { username: "", password: "" }) => {
    try {
        await driver.get("https://www.indeed.com/account/login");
        if (config.username && config.password) {
            console.log(
                "Please wait until your email appears in the field\nThen click continue\nAnd login manually."
            );
            await waitFor("#ifl-InputFormField-3");
            await driver
                .findElement(By.id("ifl-InputFormField-3"))
                .sendKeys(config.username);
            console.log(
                `Please login. \n${config.username}\n${config.password}\n`
            );
        } else console.log("Please login");

        await waitFor("#AccountMenu", 360000);

        /* REJECT COOKIES */
        await waitFor("#onetrust-reject-all-handler");
        await driver
            .findElement(By.id("onetrust-reject-all-handler"))
            .sendKeys("webdriver", Key.RETURN);
    } catch (error) {
        console.log("error in login: ", error);
    }
};

export default login;
