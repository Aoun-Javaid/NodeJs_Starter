// require('./db');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const mongoose = require('./db/db');

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
app.use(bodyParser.json());
const itemController = require('./controllers/items');

app.use('/api', itemController);
const productController = require('./controllers/productController');

app.use('/api', productController);