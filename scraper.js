import { scrapeItemPrices } from './puppeteer/puppeteerFunctions.js';

export const getAndReplaceItemPrices = async (req, res) => {
  const itemName = req.query.item || 'rx 6600';

  const data = await scrapeItemPrices(itemName);
  // console.log(data);
  res.send('lol');
};
/* 
    ! gets item name from url query
      - open ceneo website
      - search for item 
      - get link to photo, title, price of first 5 items
      - sends it to database 
 */
