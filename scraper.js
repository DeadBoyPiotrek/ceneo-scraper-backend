import { replaceItemsForProduct } from './helpers/helpersFunctions.js';

export const getAndReplaceItemPrices = async (req, res) => {
  const items = req.query;

  const nestedArr = Object.entries(items);
  nestedArr.forEach(async arr => await replaceItemsForProduct(arr[1]));

  res.send('<h1>Item scraped successfully</h1>');
};
