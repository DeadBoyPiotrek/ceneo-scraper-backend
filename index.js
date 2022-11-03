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
