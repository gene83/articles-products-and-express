'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db');

router.post('/', (req, res) => {
  knex('articles')
    .insert({
      url_title: encodeURI(req.body.title),
      title: req.body.title,
      author: req.body.author,
      body: req.body.body
    })
    .then(() => {
      res.redirect('/articles');
    });
});

router.put('/:url_title', (req, res) => {
  let url_title = req.params.url_title;
  let updatedArticle = req.body;

  updatedArticle.url_title = url_title;

  knex('articles')
    .where('url_title', '=', url_title)
    .update(updatedArticle)
    .then(() => {
      res.redirect(`/articles/${url_title}`);
    });
});

router.delete('/:url_title', (req, res) => {
  let url_title = req.params.url_title;

  knex('articles')
    .where('url_title', '=', url_title)
    .delete()
    .then(() => {
      res.redirect(`/articles`);
    });
});

router.get('/', (req, res) => {
  knex('articles')
    .select('title', 'author', 'body')
    .then(articles => {
      const data = {
        articles: articles
      };

      res.render('templates/articles/index', data);
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
      res.render('templates/articles/article', article[0]);
    });
});

router.get('/:url_title/edit', (req, res) => {
  let url_title = req.params.url_title;

  knex('articles')
    .select('url_title', 'title', 'author', 'body')
    .where('url_title', '=', url_title)
    .then(article => {
      console.log(article);
      res.render('templates/articles/edit', article[0]);
    });
});

module.exports = router;
