-- DROP USER IF EXISTS gene83;
DROP DATABASE IF EXISTS articles_and_products_db;

CREATE DATABASE articles_and_products_db;

\c articles_and_products_db;

DROP TABLE IF EXISTS articles_list;

CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  url_title VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  author VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS products_list;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  NAME VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  inventory INT NOT NULL
);

