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
  await page.goto('https://www.ozon.ru/category/spetsii-pripravy-i-pryanosti-9411/?category_was_predicted=true&deny_category_prediction=true&from_global=true&page=2&text=%D0%B3%D0%B2%D0%BE%D0%B7%D0%B4%D0%B8%D0%BA%D0%B0&tf_state=Mx19GwPK-iSp7g8cftElis8gMggopXqX5d5WddEP1Q3UWuQq')
  await page.waitForTimeout(5000)
  //await page.screenshot({ path: 'testresult2.png', fullPage: true })

  const getDataFromPage = await page.evaluate( () => {
    alert('here---');

    const allBonusSpans = document.querySelectorAll('.e5o .dl1.d3l.l3d.dx0 span');

    let hrefArr = [];
    let linksArr = [];
    let singleProductData = {};
    Array.from(allBonusSpans).forEach(bonusSpan => { 
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

     
    return  linksArr;
;
  });
  
  console.log(getDataFromPage);


  fs.writeFile( 'gvozdikaoffers.json', JSON.stringify(getDataFromPage, null, 2), (err) => {
  if (err) { throw err };
   console.log('file saved');
  })
  //await browser.close()
  console.log(`All done`)
})

