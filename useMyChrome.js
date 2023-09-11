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
  //await page.goto('https://ozon.ru/')
  await page.goto('https://www.ozon.ru/brand/soul-way-100258413/')
  await page.waitForTimeout(5000)
  await page.screenshot({ path: 'testresult2.png', fullPage: true })

  const grabParagraph = await page.evaluate( () => {
    alert('here---');

    const pgTag = document.querySelectorAll('.e5o .dl1.d3l.l3d.dx0 span');

    let hrefArr = [];
    let linksArr = [];
    let singleProductData = {};
    Array.from(pgTag).forEach(bonusSpan => { 
      if ( bonusSpan.innerText.includes('отзыв') ) {
        hrefArr.push(bonusSpan.innerText);
        let linkParentOfItem = bonusSpan.closest('a');
        if (linkParentOfItem)  {

          let productTitle = linkParentOfItem.nextElementSibling.children[2].firstChild.firstChild.innerText;
          let productPrice = linkParentOfItem.nextElementSibling.firstChild.firstChild.firstChild.innerText;
          let bonusValue = bonusSpan.innerText;
          let linkToProduct = `ozon.ru${linkParentOfItem.getAttribute("href")}`;

          singleProductData.productTitle = productTitle;
          singleProductData.linkToProduct = linkToProduct;
          
          productPrice = productPrice.replace(/\s+/g, '');
          let numberedProductPrice = productPrice.substring(0, productPrice.length-1);
          singleProductData.productPrice = Number(numberedProductPrice);

          singleProductData.bonusValue = Number(bonusValue.substring(0, bonusValue.indexOf(' ')));

          linksArr.push( {...singleProductData} );
        }
      }
      
    });

    // Array.from(pgTag).forEach((bonusSpan) => {
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
     
    return  linksArr;
;
  });
  
  console.log(grabParagraph);

  // const offers = [];
  // await grabParagraph.forEach((element) => {
  //   offers.push({'linkToProduct': element});
  // });

  fs.writeFile( 'bonusoffers.json', JSON.stringify(grabParagraph, null, 2), (err) => {
  if (err) { throw err };
   console.log('file saved');
  })
  //fs.writeFile( 'bonusangebots.txt',  grabParagraph.toString() ,() => {});
  //await browser.close()
  console.log(`All done`)
})

