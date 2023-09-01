const puppeteer = require('puppeteer');

(async () => {
  
  const browser = await puppeteer.launch( { headless: false } );
  const page = await browser.newPage();
  await page.goto('https://www.ozon.ru/brand/soul-way-100258413/?page=2', {
    waitUntil: 'load'
  });
  //await page.screenshot({ path: 'mywebsite.png'});
  
  const grabParagraph = await page.evaluate( () => {
    const pgTag = document.querySelectorAll('.d7o.od9.dp');
    let spanInnTextArr = [];
    pgTag.forEach((p) => {
      spanInnTextArr.push(p.innerText)
     })
    return pgTag;
;
  });

  console.log(grabParagraph);
  //await browser.close();

})();