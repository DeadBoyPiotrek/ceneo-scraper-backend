import { replaceData } from '../mongoDB/mongoDBFunctions.js';
import { scrapeItemPrices } from '../puppeteer/puppeteerFunctions.js';

//! call replace data once for each item
//! save data in different collection for each item

export const replaceItemsForProduct = async product => {
  const data = await scrapeItemPrices(product);
  data && replaceData(data, product);
};
