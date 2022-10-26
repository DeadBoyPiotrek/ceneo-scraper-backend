import { getAndReplaceItemPrices, removeItem } from './scraper.js';

const routes = app => {
  app.get('/', (req, res) => {
    res.send('hello');
  });
  app.get('/getAndReplace', getAndReplaceItemPrices);
  app.get('/deleteData', removeItem);
};

export default routes;
