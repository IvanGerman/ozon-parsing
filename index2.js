const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  
  const browser = await puppeteer.launch( { headless: false } );
  const page = await browser.newPage();
  await page.goto('https://bot.sannysoft.com/', {
    waitUntil: 'load'
  });
  // await page.setViewport({width: 1920, height: 1080});
  //When you set the viewport with width and height as "0", the page viewport size becomes equal to size of the browser. :
  await page.setViewport({width: 0, height: 0});

  await page.screenshot( { path: '123.png', fullPage: true })
  //await page.pdf( { path: 'aloeapt.pdf', format: 'A4' })

  //const html = await page.content();
  //console.log(html);

  // const links = await page.evaluate(() => Array.from( document.querySelectorAll('a'), (e) => e.href))
  // console.log(links);

  //const angebots = await page.evaluate(() => Array.from( document.querySelectorAll('.swiper-slide__info'), (e) => ({ title: e.querySelector('a').innerText})))
  //console.log(angebots);

  //save data to JSON file
  //fs.writeFile( 'angebots.json', JSON.stringify(angebots, null, 2), (err) => {
   // if (err) { throw err };
    //console.log('file saved');
  //})
  //await browser.close();

})();