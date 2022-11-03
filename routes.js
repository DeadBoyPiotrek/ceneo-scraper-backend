import { postAndReplaceItemPrices, removeItem } from './scraper.js';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
const routes = app => {
  app.get('/', (req, res) => {
    res.send('hello');
  });
  app.post('/postAndReplace', jsonParser, postAndReplaceItemPrices);
  app.post('/deleteData', jsonParser, removeItem);
};

export default routes;
