const puppeteer = require('puppeteer');

(async () => {
  
  const browser = await puppeteer.launch( { headless: false } );
  const page = await browser.newPage();
  await page.goto('https://www.ebay.de/sch/i.html?_from=R40&_trksid=p4432023.m570.l1313&_nkw=Schleifpapier+&_sacat=0', {
    waitUntil: 'load'
  });
  //await page.screenshot({ path: 'mywebsite.png'});
  
  const grabParagraph = await page.evaluate( () => {
    const pgTag = document.querySelectorAll('.s-item__seller-info-text');
    let spanInnTextArr = [];
    pgTag.forEach((p) => {
      spanInnTextArr.push(p.innerText)
     })
    return spanInnTextArr;
;
  });

  console.log(grabParagraph);
  //await browser.close();

})();