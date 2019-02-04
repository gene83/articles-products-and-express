'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db');

const renderData = {
  articleList: null,
  article: null,
  error: null,
  deleteSuccessful: false
};

router.post('/', (req, res) => {
  renderData.error = null;

  knex('articles')
    .insert({
      url_title: encodeURI(req.body.title),
      title: req.body.title,
      author: req.body.author,
      body: req.body.body
    })
    .then(() => {
      res.redirect('/articles');
    })
    .catch(error => {
      renderData.error = error;
      res.redirect('/articles/new');
    });
});

router.put('/:url_title', (req, res) => {
  let url_title = req.params.url_title;
  let updatedArticle = req.body;

  renderData.error = null;
  updatedArticle.url_title = encodeURI(req.body.title);

  knex('articles')
    .where('url_title', '=', url_title)
    .update(updatedArticle)
    .then(() => {
      res.redirect(`/articles/${updatedArticle.url_title}`);
    })
    .catch(error => {
      renderData.error = error;
      res.redirect(`/articles/${renderData.article.url_title}/edit`);
    });
});

router.delete('/:url_title', (req, res) => {
  let url_title = req.params.url_title;

  renderData.error = null;

  knex('articles')
    .where('url_title', '=', url_title)
    .delete()
    .then(() => {
      renderData.deleteSuccessful = true;
      res.redirect(`/articles`);
    })
    .catch(error => {
      renderData.deleteSuccessful = false;
      renderData.error = error;
      res.redirect(`/article/${url_title}`);
    });
});

router.get('/', (req, res) => {
  knex('articles')
    .select('title', 'author', 'body')
    .then(articleList => {
      renderData.articleList = articleList;
      res.render('templates/articles/index', renderData);
    });
});

router.get('/new', (req, res) => {
  res.render('templates/articles/new');
});

router.get('/:url_title', (req, res) => {
  let url_title = req.params.url_title;

  knex('articles')
    .select('title', 'author', 'body')
    .where('url_title', '=', url_title)
    .then(article => {
      renderData.article = article[0];
      res.render('templates/articles/article', renderData);
    });
});

router.get('/:url_title/edit', (req, res) => {
  let url_title = req.params.url_title;

  knex('articles')
    .select('url_title', 'title', 'author', 'body')
    .where('url_title', '=', url_title)
    .then(article => {
      renderData.article = article[0];
      res.render('templates/articles/edit', renderData);
    });
});

module.exports = router;
