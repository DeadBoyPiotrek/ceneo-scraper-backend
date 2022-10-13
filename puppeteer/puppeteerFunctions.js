import { makeScreenshot } from '../helpers/helperFunctions.js';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());
import UserAgent from 'user-agents';
const userAgent = new UserAgent();

export const getPrice = async (url, item) => {
  const photos = [];
  const browser = await puppeteer.launch({
    //   headless: false,
    //   args: ['--proxy-server=http://91.234.127.222:53281'],
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });

  const page = (await browser.pages())[0];
  try {
    await page.setUserAgent(userAgent.random().toString());

    await page.goto('https://whatismyipaddress.com/');
    photos.push(await makeScreenshot(page));
    // await page.goto(url);
    // const photo1 = await page.screenshot({});
    // const photo1base64 = await photo1.toString('base64');
    // photos.push(await makeScreenshot(page));
    // await page.focus('#form-head-search-q');
    // await page.keyboard.type(item);
    // await page.keyboard.press('Tab');
    // await page.keyboard.press('Enter');

    // photos.push(await makeScreenshot(page));
    // await page.waitForSelector('.js_seoUrl');
    // await page.click('.js_seoUrl');
    // await page.waitForTimeout(500);
    // photos.push(await makeScreenshot(page));
    // const photo2 = await page.screenshot({});
    // photo2base64 = await photo2.toString('base64');
    await browser.close();
    return photos;
  } catch (error) {
    console.log('error getting price', error);
    return photos;
  }
};

//! puppeteer
