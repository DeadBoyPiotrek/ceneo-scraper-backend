import express from 'express';
import routes from './routes.js';

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static('public'));
app.set('port', PORT);

routes(app);

app.listen(app.get('port'), () => {
  console.log(`listening on port ${PORT}`);
});

// app.get('/deleteAll', async (req, res) => {
//   await deleteAll();
//   res.send('deleteAll');
// });

// app.get('/getAndReplace', async (req, res) => {
//   try {
//     const photos = await geItemPrices(item);
//     await replaceData(photos);
//     res.send('replacePrice done');
//   } catch (error) {
//     console.log('error replacing price', error);
//   }
// });
// app.get('/getAndReplace', getItemPrices);
