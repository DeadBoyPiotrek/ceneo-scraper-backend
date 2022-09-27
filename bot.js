import puppeteer from 'puppeteer';

const url = 'https://www.ceneo.pl/';

//! change this to something else
const item = 'LG UltraGear 27GP850-B';
//! change this to something else

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.goto(url);
  await page.focus('#form-head-search-q');
  await page.keyboard.type(item);
  //   await page.focus('.header-search__button__text');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  //   await page.focus('.cat-prod-row__body');
  await page.evaluate(() => {
    [...document.querySelectorAll('button')]
      .find(element => element.textContent === 'Porównaj ceny')
      .click();
  });

  if (button) {
    await button.click();
  }
  //   await browser.close();
})();
