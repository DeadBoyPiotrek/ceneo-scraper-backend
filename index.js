import express from 'express';
import { getPrice } from './puppeteer/puppeteerFunctions.js';
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
    const photos = await getPrice(url, item);
    await uploadScreenshots(photos);
    res.send('getPrice done');
  } catch (error) {
    console.log('error getting price', error);
  }
});
app.get('/getAndReplace', async (req, res) => {
  try {
    const photos = await getPrice(url, item);
    await replaceScreenshots(photos);
    res.send('replacePrice done');
  } catch (error) {
    console.log('error replacing price', error);
  }
});

//* express
