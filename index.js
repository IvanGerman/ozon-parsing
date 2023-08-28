const puppeteer = require('puppeteer');

(async () => {
  
  const browser = await puppeteer.launch( { headless: false } );
  const page = await browser.newPage();
  await page.goto('https://www.ozon.ru/brand/soul-way-100258413/');
  //await page.screenshot({ path: 'mywebsite.png'});
  
  const grabParagraph = await page.evaluate( () => {
    const pgTag = document.querySelectorAll('span');
    let spanInnTextArr = [];
    pgTag.forEach((span, index) => {
      if (span.innerText.includes('отзыв')) {
        spanInnTextArr.push(span.innerText + String(index))
      }
    })
    return spanInnTextArr;
  });

  console.log(grabParagraph);
  await browser.close();

})();