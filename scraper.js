import { replaceItemsForProduct } from './helpers/helpersFunctions.js';
import { deleteData } from './mongoDB/mongoDBFunctions.js';

export const postAndReplaceItemPrices = async (req, res) => {
  try {
    const products = req.body.products;
    console.log('products', products);
    for await (const product of products) {
      await replaceItemsForProduct(product);
    }
    res.send('<h1>Items scraped successfully</h1>');
  } catch (error) {
    console.error(error);
    res.send('<h1>Something went wrong replacing Items</h1>');
  }
};

export const removeItem = async (req, res) => {
  try {
    const products = req.body.products;
    // console.log('products', products);
    const errors = [];
    for await (const product of products) {
      const result = await deleteData(product);
      if (result) {
        errors.push(result);
      }
    }
    if (errors.length > 0) {
      res.send('<h1>Something went wrong deleting Items</h1>');
    } else {
      res.send('<h1>Items deleted successfully</h1>');
    }
  } catch (error) {
    console.error(error);
    res.send('<h1>Something went wrong deleting Items</h1>');
  }
};
