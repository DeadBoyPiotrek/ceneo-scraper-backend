import { getAndReplaceItemPrices } from './scraper.js';
import { deleteData } from './mongoDB/mongoDBFunctions.js';
const routes = app => {
  app.get('/', (req, res) => {
    res.send('hello');
  });
  app.get('/getAndReplace', getAndReplaceItemPrices);
  app.get('/deleteAll', deleteData);
};

export default routes;
