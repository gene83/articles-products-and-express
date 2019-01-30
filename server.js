'use strict';

const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const articles = require('./routes/articles');
const products = require('./routes/products');

const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded());
app.use(methodOverride('_method'));
app.use('/products', products);
app.use('/articles', articles);

app.get('/', (req, res) => {
  res.render('home');
});

app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main.hbs' }));
app.set('view engine', '.hbs');

app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});
