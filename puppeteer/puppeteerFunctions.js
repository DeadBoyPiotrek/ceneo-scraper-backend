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
    //TODO change wait for timeout to smth else
    // await page.waitForTimeout(500);
    await page.waitForSelector('#form-head-search-q');
    await page.type('#form-head-search-q', itemName);

    const searchButton = await page.$('.header-search__button__text');
    await searchButton.click();

    // select all items
    //TODO change wait for timeout to smth else
    await page.waitForSelector(
      '.category-list > .category-list-body > .js_category-list-item'
    );
    await page.waitForTimeout(3000);
    const sectionHandle = await page.$$(
      '.category-list > .category-list-body > .js_category-list-item'
    );

    // if we got something
    if (sectionHandle.length > 0) {
      // get just first X items
      const items = [];
      if (sectionHandle.length >= 5) {
        for (let i = 0; i < 5; i++) {
          const item = sectionHandle[i];
          items.push(item);
        }
      } else {
        for (let i = 0; i < sectionHandle.length; i++) {
          const item = sectionHandle[i];
          items.push(item);
        }
      }

      // get link to item, photo, title, price of first 5 items
      const finishedArray = [];
      for (let item of items) {
        const itemLink = await page.evaluate(
          element =>
            element.querySelector(
              '.cat-prod-row__body > .cat-prod-row__content > .cat-prod-row__desc > .cat-prod-row__desc-row > .cat-prod-row__desc-col > .cat-prod-row__name > a'
            ).href,

          item
        );
        const itemTitle = await page.evaluate(
          element =>
            element.querySelector(
              '.cat-prod-row__body > .cat-prod-row__content > .cat-prod-row__desc > .cat-prod-row__desc-row > .cat-prod-row__desc-col > .cat-prod-row__name > a > span'
            ).textContent,

          item
        );

        const itemImageUrl = await page.evaluate(
          element =>
            element.querySelector(
              '.cat-prod-row__body > .cat-prod-row__foto > a > img'
            ).src,

          item
        );
        const itemImageWidth = await page.evaluate(
          element =>
            element.querySelector(
              '.cat-prod-row__body > .cat-prod-row__foto > a > img'
            ).naturalWidth,

          item
        );
        const itemImageHeight = await page.evaluate(
          element =>
            element.querySelector(
              '.cat-prod-row__body > .cat-prod-row__foto > a > img'
            ).naturalHeight,

          item
        );
        const itemImage = {
          height: itemImageHeight,
          width: itemImageWidth,
          url: itemImageUrl,
        };

        const itemValue = await page.evaluate(
          element =>
            element.querySelector(
              '.cat-prod-row__body > .cat-prod-row__content > .cat-prod-row__price > a > .price-format > .price > .value'
            ).textContent,

          item
        );
        const itemPenny = await page.evaluate(
          element =>
            element.querySelector(
              '.cat-prod-row__body > .cat-prod-row__content > .cat-prod-row__price > a > .price-format > .price > .penny'
            ).textContent,

          item
        );

        const itemPrice = parseFloat(
          (itemValue + itemPenny).replace(/\s/g, '').replace(',', '.')
        );
        finishedArray.push({
          itemLink,
          itemTitle,
          itemImage,
          itemPrice,
        });
      }
      await browser.close();
      return finishedArray;
    }
    await browser.close();
  } catch (error) {
    console.log('error getting items', error);
  }
};
