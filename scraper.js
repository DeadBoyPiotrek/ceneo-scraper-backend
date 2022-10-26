import { replaceItemsForProduct } from './helpers/helpersFunctions.js';
import { deleteData } from './mongoDB/mongoDBFunctions.js';

export const getAndReplaceItemPrices = async (req, res) => {
  const items = req.query;
  const nestedArr = Object.entries(items);
  for await (const arr of nestedArr) {
    await replaceItemsForProduct(arr[1]);
  }
  res.send('<h1>Items scraped successfully</h1>');
};

export const removeItem = async (req, res) => {
  const items = req.query;
  const nestedArr = Object.entries(items);
  console.log('nestedArr', nestedArr);
  nestedArr.forEach(async arr => await deleteData(arr[1]));
  res.send('<h1>Items deleted successfully</h1>');
};
