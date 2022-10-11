import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());
import express from 'express';
import scheduledFunctions from './scheduledFunctions/function1.js';
import {
  deleteAll,
  uploadScreenshots,
  replaceScreenshots,
} from './mongoDB/mongodb2.js';

const url = 'https://www.ceneo.pl/';
//! change this to something else 😵🐊
const item = 'rtx 3060';
//! change this to something else 😵🐊

//* express
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static('public'));
app.set('port', PORT);

app.listen(app.get('port'), () => {
  console.log(`listening on port ${PORT}`);
});

app.get('/scrape', (req, res) => {
  scheduledFunctions();
  res.send('scheduledFunctions started');
});
app.get('/deleteAll', async (req, res) => {
  await deleteAll();
  res.send('deleteAll');
});

app.get('/', (req, res) => {
  res.send('hello /');
});
app.get('/getAndPost', async (req, res) => {
  try {
    const photos = await getPrice();
    await uploadScreenshots(photos);
    res.send('getPrice done');
  } catch (error) {
    console.log('error getting price', error);
  }
});
app.get('/getAndReplace', async (req, res) => {
  try {
    const photos = await getPrice();
    await replaceScreenshots(photos);
    res.send('replacePrice done');
  } catch (error) {
    console.log('error replacing price', error);
  }
});

//* express

//! puppeteer
export const getPrice = async () => {
  try {
    const browser = await puppeteer.launch({
      // headless: false,
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
    );
    await page.goto(url);
    await page.focus('#form-head-search-q');
    await page.keyboard.type(item);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.waitForSelector('.js_seoUrl');
    const photo1 = await page.screenshot({});
    await page.click('.js_seoUrl');
    await page.waitForTimeout(500);
    const photo2 = await page.screenshot({});

    const photo1base64 = await photo1.toString('base64');
    const photo2base64 = await photo2.toString('base64');
    // const photo2base64 = photo1base64;
    await browser.close();
    return { photo1base64, photo2base64 };
  } catch (error) {
    console.log('error getting price', error);
  }
};

//! puppeteer
