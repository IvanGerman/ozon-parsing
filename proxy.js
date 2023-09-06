//const fs = require('fs');
//const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
//const StealthPlugin = require('puppeteer-extra-plugin-stealth')
//puppeteer.use(StealthPlugin())

const puppeteer = require('puppeteer');

(async () => {
const proxyServer = '51.159.115.233:3128';

// Launch Puppeteer with proxy configuration
const browser = await puppeteer.launch({
headless: false,
args: [`--proxy-server=${proxyServer}`],
//executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
//userDataDir: 'C:/Users/AlHe/AppData/Local/Google/Chrome/User Data/Default',
});


const page = await browser.newPage();


// Navigate to a website
await page.goto('https://aloeapteka.ru/');

await page.screenshot({ path: 'testresult2.png', fullPage: true })

//await browser.close();
})()

