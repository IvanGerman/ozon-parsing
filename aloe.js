const fs = require('fs');
const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

// puppeteer usage as normal
puppeteer.launch( {
   headless: false, 
   executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
   userDataDir: 'C:/Users/AlHe/AppData/Local/Google/Chrome/User Data/Default',
  //  args: [
  //   "--proxy-server=31.207.128.79:9876"
  //  ]
   } ).then(async browser => {
  console.log('Running tests..')
  const page = await browser.newPage()
  await page.goto('https://aloeapteka.ru/')
  await page.waitForTimeout(5000)
  await page.screenshot({ path: 'testresult2.png', fullPage: true })

  const grabParagraph = await page.evaluate( () => {
    alert('here---');
    const pgTag = Array.from(document.querySelectorAll('.main-nav a'));
    let hrefArr = []
    pgTag.forEach(element => { 
      hrefArr.push(element.getAttribute("href"))
    });
    // let linksArr = [];
    // pgTag.forEach((bonusSpan) => {
    //   console.log('bonusSpan---', bonusSpan);
    //   if ( bonusSpan.innerText.includes('отзыв') ) {
    //     let linkParentOfItem = bonusSpan.closest('.im2');
    //     if (linkParentOfItem)  {
    //       let linkToItem = `ozon.ru${bonusSpan.closest('.im2').getAttribute("href")}`;
    //       linksArr.push(linkToItem);
    //     }
        
    //     //spanInnTextArr.push(p.innerText);
    //   }   
    //  });
     
    return  hrefArr;
;
  });
  
  console.log(grabParagraph);

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
  console.log(`All done`)
})

