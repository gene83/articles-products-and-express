'use strict';

const express = require('express');
const router = express.Router();
const products = require('../db/products');

const data = {
  products: products.all(),
  product: undefined,
  errorData: undefined,
  deleteSuccessful: false,
  id: null
};

router.post('/', (req, res) => {
  data.errorData = undefined;

  if (products.isProperData(req.body) !== true) {
    let reqErrors = products.isProperData(req.body);

    data.errorData = reqErrors;
    return res.redirect('/products/new');
  }

  products.add(req.body);
  res.redirect('/products');
});

router.put('/:id', (req, res) => {
  let id = req.params.id;

  data.errorData = undefined;

  if (products.isProperData(req.body) !== true) {
    let reqErrors = products.isProperData(req.body);

    data.errorData = reqErrors;
    return res.redirect(`/products/${id}/edit`);
  }

  products.editById(id, req.body);
  res.redirect(`/products/${id}`);
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;

  data.id = id;
  if (!products.getByID(id)) {
    data.deleteSuccessful = false;
    return res.redirect(`/products/${id}`);
  }

  products.deleteByID(id);
  data.deleteSuccessful = true;
  res.redirect(`/products`);
});

router.get('/', (req, res) => {
  res.render('templates/products/index', data);
});

router.get('/new', (req, res) => {
  res.render('templates/products/new', data);
});

router.get('/:id', (req, res) => {
  let id = req.params.id;

  data.id = id;
  data.product = products.getByID(id);
  res.render('templates/products/product', data);
});

router.get('/:id/edit', (req, res) => {
  let id = req.params.id;

  data.product = products.getByID(id);
  res.render('templates/products/edit', data);
});

module.exports = router;
