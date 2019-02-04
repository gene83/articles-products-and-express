-- DROP USER IF EXISTS gene83;
DROP DATABASE IF EXISTS articles_and_products_db;

CREATE DATABASE articles_and_products_db;

\c articles_and_products_db;

DROP TABLE IF EXISTS articles_list;

CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  url_title VARCHAR(255) CHECK (length(url_title) > 0),
  title VARCHAR(255) CHECK (length(title) > 0),
  body TEXT NOT NULL CHECK (length(body) > 0),
  author VARCHAR(255) CHECK (length(author) > 0)
);

DROP TABLE IF EXISTS products_list;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) CHECK (length(name) > 0),
  price INT CHECK (price > 0),
  inventory INT CHECK (inventory > 0)
);

