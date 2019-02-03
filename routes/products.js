'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db');

router.post('/', (req, res) => {
  knex('products')
    .insert({
      name: req.body.name,
      price: parseInt(req.body.price),
      inventory: parseInt(req.body.inventory)
    })
    .then(() => {
      res.redirect('/products');
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
    });
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;

  knex('products')
    .where('id', '=', id)
    .delete()
    .then(() => {
      res.redirect(`/products`);
    });
});

router.get('/', (req, res) => {
  knex('products')
    .select('name', 'price', 'inventory')
    .then(productList => {
      const data = {
        products: productList
      };

      res.render('templates/products/index', data);
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
      res.render('templates/products/product', product[0]);
    });
});

router.get('/:id/edit', (req, res) => {
  let id = req.params.id;

  knex('products')
    .select('id', 'name', 'price', 'inventory')
    .where('id', '=', id)
    .then(product => {
      res.render('templates/products/edit', product[0]);
    });
});

module.exports = router;
