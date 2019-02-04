'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db');

const renderData = {
  productList: null,
  product: null,
  error: null
};

router.post('/', (req, res) => {
  knex('products')
    .insert({
      name: req.body.name,
      price: parseInt(req.body.price),
      inventory: parseInt(req.body.inventory)
    })
    .then(() => {
      res.redirect('/products');
    })
    .catch(error => {
      console.log(error);

      res.redirect('/products/new');
    });
});

router.put('/:id', (req, res) => {
  let id = req.params.id;
  let updatedProduct = req.body;
  updatedProduct.price = parseInt(updatedProduct.price);
  updatedProduct.inventory = parseInt(updatedProduct.inventory);

  knex('products')
    .where('id', '=', id)
    .update(updatedProduct)
    .then(() => {
      res.redirect(`/products/${id}`);
    })
    .catch(error => {
      console.log(error);
      res.redirect(`/products/${id}/edit`);
    });
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;

  knex('products')
    .where('id', '=', id)
    .delete()
    .then(() => {
      res.redirect(`/products`);
    })
    .catch(error => {
      res.redirect(`/products/${id}`);
    });
});

router.get('/', (req, res) => {
  knex('products')
    .select('name', 'price', 'inventory')
    .then(productList => {
      renderData.productList = productList;
      res.render('templates/products/index', renderData);
    });
});

router.get('/new', (req, res) => {
  res.render('templates/products/new');
});

router.get('/:id', (req, res) => {
  let id = req.params.id;

  knex('products')
    .select('id', 'name', 'price', 'inventory')
    .where('id', '=', id)
    .then(product => {
      renderData.product = product[0];
      res.render('templates/products/product', renderData);
    });
});

router.get('/:id/edit', (req, res) => {
  let id = req.params.id;

  knex('products')
    .select('id', 'name', 'price', 'inventory')
    .where('id', '=', id)
    .then(product => {
      renderData.product = product[0];
      res.render('templates/products/edit', renderData);
    });
});

module.exports = router;
