import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());
import UserAgent from 'user-agents';
const userAgent = new UserAgent();

export const scrapeItemPrices = async itemName => {
  const ceneoUrl = 'https://www.ceneo.pl/';

  const browser = await puppeteer.launch({
    // headless: false,
    args: ['--no-sandbox'],
    // defaultViewport: {
    //   width: 1920,
    //   height: 1080,
    // },
    defaultViewport: false,
  });

  const page = (await browser.pages())[0];
  await page.setUserAgent(userAgent.random().toString());
  try {
    await page.goto(ceneoUrl);
    await page.type('#form-head-search-q', itemName);

    const searchButton = await page.$('.header-search__button__text');
    await searchButton.click();

    // select all items
    //TODO change wait for timeout to smth else
    await page.waitForTimeout(2000);
    const sectionHandle = await page.$$(
      '.category-list > .category-list-body > .js_category-list-item'
    );
    // get link to photo, title, price of first 5 items

    const items = [];
    for (let i = 0; i < 5; i++) {
      const item = sectionHandle[i];
      items.push(item);
    }

    console.log('items:', items);
    for (let item of items) {
      const itemTitle = await page.evaluate(
        element =>
          element.querySelector(
            '.cat-prod-row__body > .cat-prod-row__content > .cat-prod-row__desc > .cat-prod-row__desc-row > .cat-prod-row__desc-col > .cat-prod-row__name > a > span'
          ).textContent,

        item
      );
      console.log('item2: ', itemTitle);
    }

    await browser.close();
    // return results;
  } catch (error) {
    console.log('error getting items', error);
  }
};
