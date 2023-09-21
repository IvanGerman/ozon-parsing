const fs = require('fs');
const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

var dataFromAllPages = [];

// puppeteer usage as normal
puppeteer.launch({
  headless: false,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  userDataDir: 'C:/Users/AlHe/AppData/Local/Google/Chrome/User Data/Default',
  //  args: [
  //   "--proxy-server=31.207.128.79:9876"
  //  ]
}).then(async browser => {
  console.log('Running tests..');
  const page = await browser.newPage();

  await page.goto('https://www.ozon.ru/category/bytovaya-himiya-36861/?category_was_predicted=true&deny_category_prediction=true&from_global=true&text=%D0%A1%D1%80%D0%B5%D0%B4%D1%81%D1%82%D0%B2%D0%BE+%D0%B4%D0%BB%D1%8F+%D0%BC%D1%8B%D1%82%D1%8C%D1%8F+%D0%BF%D0%BE%D1%81%D1%83%D0%B4%D1%8B', {
     waitUntil: 'load'
   });
  // await page.goto('https://www.ozon.ru/brand/soul-way-100258413/', {
  //   waitUntil: 'load'
  // });


  let isItLastPage = false;
  var i = 0;

  const getDataMain = async () => {
    //await page.waitForTimeout(5000);

    const getDataFromPage = await page.evaluate(() => {

      const allBonusSpans = document.querySelectorAll('.iv8 .i2.j0.j2.ai0 span');
      console.log('allBonusSpans--', allBonusSpans);
      let hrefArr = [];
      let linksArr = [];
      let singleProductData = {};
      Array.from(allBonusSpans).forEach(bonusSpan => {
        if (bonusSpan.innerText.includes('отзыв')) {
          hrefArr.push(bonusSpan.innerText);
          let linkParentOfItem = bonusSpan.closest('a');
          if (linkParentOfItem) {

            let productTitle = linkParentOfItem.nextElementSibling.children[2].firstChild.firstChild.innerText;
            let productPrice = linkParentOfItem.nextElementSibling.firstChild.firstChild.firstChild.innerText;
            let bonusValue = bonusSpan.innerText;
            let linkToProduct = `ozon.ru${linkParentOfItem.getAttribute("href")}`;

            singleProductData.productTitle = productTitle;
            singleProductData.linkToProduct = linkToProduct;

            productPrice = productPrice.replace(/\s+/g, '');
            let numberedProductPrice = productPrice.substring(0, productPrice.length - 1);
            singleProductData.productPrice = Number(numberedProductPrice);

            singleProductData.bonusValue = Number(bonusValue.substring(0, bonusValue.indexOf(' ')));

            linksArr.push({ ...singleProductData });
          }
        }
      });
      return linksArr;
    });

    getDataFromPage.forEach((singleProduct) => {
      dataFromAllPages.push(singleProduct);
    });
  }


  while (isItLastPage !== true) {

    i += 1;
    if (i === 8) { break }

    await page.waitForTimeout(5000);
    getDataMain();

    // to do - click only forward button
    await page.click('a.a2423-a4');
    console.log(dataFromAllPages);

    try {
      await page.waitForSelector('a.a2423-a4');
    } catch (error) {
      console.log('errorhandling');
      getDataMain();
      break;
    }


    isItLastPage = (await page.$('a.a2423-a4')) === null;
    console.log('isItLastPage---', isItLastPage);

    if (isItLastPage === true) {
      console.log('last page to get data');
      await page.waitForTimeout(5000);
      getDataMain();
    }
  }

  fs.writeFile('gvozdikaoffers.json', JSON.stringify(dataFromAllPages, null, 2), (err) => {
    if (err) { throw err };
    console.log('file saved');
  })
  //await browser.close()
  console.log(`All done`)
})

