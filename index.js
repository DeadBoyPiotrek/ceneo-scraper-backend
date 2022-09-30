import puppeteer from 'puppeteer';
import express from 'express';
import scheduledFunctions from './scheduledFunctions/function1.js';
// import { dbConnect } from './mongoDB/mongodb.js';

const url = 'https://www.ceneo.pl/';
//! change this to something else 😵🐊
const item = 'rtx 3060';
//! change this to something else 😵🐊

// const db = dbConnect();

//* express

const app = express();

app.set('port', 3000);

scheduledFunctions();

app.listen(app.get('port'), () => {
  console.log('listening on port 300');
});

//* express

//! puppeteer
export const getData = async () => {
  const browser = await puppeteer.launch({
    // headless: false,
    // defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.goto(url);
  await page.focus('#form-head-search-q');
  await page.keyboard.type(item);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await page.waitForSelector('.js_seoUrl');
  await page.screenshot({ path: 'screenshot1.png' });
  await page.click('.js_seoUrl');
  await page.screenshot({ path: 'screenshot2.png' });
  await browser.close();
};

//! puppeteer
