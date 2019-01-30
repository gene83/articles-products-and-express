'use strict';

const express = require('express');
const router = express.Router();
const articles = require('../db/articles');

const data = {
  articles: articles.all(),
  article: undefined,
  errorData: undefined,
  deleteSuccessful: false,
  urlTitle: undefined
};

router.post('/', (req, res) => {
  data.errorData = undefined;

  if (articles.isProperData(req.body) !== true) {
    let reqErrors = articles.isProperData(req.body);
    data.errorData = reqErrors;
    return res.redirect('/articles/new');
  }

  articles.add(req.body);
  res.redirect('/articles');
});

router.put('/:urlTitle', (req, res) => {
  let urlTitle = req.params.urlTitle;

  data.errorData = undefined;

  if (articles.isProperData(req.body) !== true) {
    let reqErrors = articles.isProperData(req.body);

    data.errorData = reqErrors;
    return res.redirect(`/articles/${urlTitle}/edit`);
  }

  articles.editByUrlTitle(urlTitle, req.body);
  res.redirect(`/articles/${urlTitle}`);
});

router.delete('/:urlTitle', (req, res) => {
  let urlTitle = req.params.urlTitle;

  if (!articles.getByUrlTitle(urlTitle)) {
    data.deleteSuccessful = false;
    return res.redirect(`/articles/${urlTitle}`);
  }

  data.article = articles.getByUrlTitle(urlTitle);
  articles.deleteByUrlTitle(urlTitle);
  data.deleteSuccessful = true;
  res.redirect(`/articles`);
});

router.get('/', (req, res) => {
  res.render('templates/articles/index', data);
});

router.get('/new', (req, res) => {
  res.render('templates/articles/new', data);
});

router.get('/:urlTitle', (req, res) => {
  let urlTitle = req.params.urlTitle;

  data.urlTitle = urlTitle;
  data.article = articles.getByUrlTitle(urlTitle);
  res.render('templates/articles/article', data);
});

router.get('/:urlTitle/edit', (req, res) => {
  let urlTitle = req.params.urlTitle;

  data.urlTitle = urlTitle;
  data.article = articles.getByUrlTitle(urlTitle);
  res.render('templates/articles/edit', data);
});

module.exports = router;
