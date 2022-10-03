import puppeteer from 'puppeteer';
import express from 'express';
import scheduledFunctions from './scheduledFunctions/function1.js';

const url = 'https://www.ceneo.pl/';
//! change this to something else 😵🐊
const item = 'rtx 3060';
//! change this to something else 😵🐊

//* express

const app = express();
app.use(express.static('public'));
app.set('port', 3000);

scheduledFunctions();

app.listen(app.get('port'), () => {
  console.log('listening on port 300');
});

app.get('/', (req, res) => {
  res.send('hello /');
});
app.get('/', (req, res) => {
  res.send('screenshot1.png');
});
app.get('/', (req, res) => {
  res.send('screenshot2.png');
});

//* express

//! puppeteer
export const getPrice = async () => {
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
  await page.screenshot({ path: './public/screenshot1.png' });
  await page.click('.js_seoUrl');
  await page.waitForTimeout(500);
  await page.screenshot({ path: './public/screenshot2.png' });
  await browser.close();
};

//! puppeteer
