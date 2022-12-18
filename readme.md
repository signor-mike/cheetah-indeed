Beta release!

Known bugs: if searching for a job with a new title (never used before): modal window might appear prompting user to subscribe to job alerts. User has to manually close it as soon as possible.
Workaround: be quick or don't search job titles that you've never used before.

How to run the bot:
Install Node.js and NPM: https://nodejs.org/en/  
For windows users: you'll also need a terminal: https://learn.microsoft.com/en-us/windows/terminal/

To ensure that your machine has node.js and npm installed: run following commands in the terminal `node --version` and `npm --version` author's versions are 18.7.0 and 8.18.0 respectively.

As it is a beta version: npm package is not published hence can't be installed via npm.  
In order to have an app on your machine you'll need to either clone the repo or download zip archive.  
To clone (needs `git` installed): `git clone https://github.com/Mike-OxHuge/cheetah-indeed.git`  
Download link for a zip file: https://github.com/Mike-OxHuge/cheetah-indeed/archive/refs/heads/master.zip

Navigate to the corresponding directory on your machine, using `cd /path/to/program` and run `npm install`

open `/src/config.js` and edit it. Keep all the quotes and commas. The only values you're supposed to modify are inside of quotes. Email and password are not required. You'll have to write them manually if not provided. If provided: email inserted automatically and password has to be copied and pasted (due to occasional captchas and 2FA I didn't bother to bypass them).

run in terminal `npm run start`, login and have a cup'o'tea.

Contributors are very welcome.  
Please use github issues for anything related.  
For other stuff: do not hesitate to drop me an email at dev_mike.k@yahoo.com
