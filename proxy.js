const fs = require('fs');
const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
//const StealthPlugin = require('puppeteer-extra-plugin-stealth')
//puppeteer.use(StealthPlugin())



(async () => {
const proxyServer = '103.15.80.85:3128';

// Launch Puppeteer with proxy configuration
const browser = await puppeteer.launch({
headless: false,
args: [`--proxy-server=${proxyServer}`],
executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
userDataDir: 'C:/Users/AlHe/AppData/Local/Google/Chrome/User Data/Default',
});


const page = await browser.newPage();


// Navigate to a website
await page.goto('https://www.tomsk.ru/');

await page.screenshot({ path: 'testresult2.png', fullPage: true })

//await browser.close();
})()







// // puppeteer usage as normal
// puppeteer.launch( {
//    headless: false, 
//    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
//    userDataDir: 'C:/Users/AlHe/AppData/Local/Google/Chrome/User Data/Default',
//    args: [
//     "--proxy-server=103.15.80.85:3128"
//    ]
//    } ).then(async browser => {
//   console.log('Running tests..')
//   const page = await browser.newPage()
//   await page.goto('https://www.tomsk.ru/')
//   // await page.goto('https://www.ozon.ru/brand/soul-way-100258413/')
//   await page.waitForTimeout(5000)
//   await page.screenshot({ path: 'testresult2.png', fullPage: true })

//   const grabParagraph = await page.evaluate( () => {
//     const pgTag = document.querySelectorAll('.dl.l1d.d2l span');
//     let linksArr = [];
//     pgTag.forEach((bonusSpan) => {
//       if ( bonusSpan.innerText.includes('отзыв') ) {
//         let linkParentOfItem = bonusSpan.closest('.im2');
//         if (linkParentOfItem)  {
//           let linkToItem = `ozon.ru${bonusSpan.closest('.im2').getAttribute("href")}`;
//           linksArr.push(linkToItem);
//         }
        
//         //spanInnTextArr.push(p.innerText);
//       }   
//      });
     
//     return  linksArr;
// ;
//   });
  
  //console.log(grabParagraph);

  // const offers = [];
  // await grabParagraph.forEach((element) => {
  //   offers.push({'linkToProduct': element});
  // });

  // fs.writeFile( 'bonusoffers.json', JSON.stringify(offers, null, 2), (err) => {
  // if (err) { throw err };
  //  console.log('file saved');
  // })
  //fs.writeFile( 'bonusangebots.txt',  grabParagraph.toString() ,() => {});

  //await browser.close()
  //console.log(`All done`)
//})
