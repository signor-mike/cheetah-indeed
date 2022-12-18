import main from "./src/index.js";
import config from "./src/config.js";
import { Builder } from "selenium-webdriver";

export const driver = await new Builder().forBrowser(config.browser).build();

main(driver, config);
