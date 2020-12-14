DROP DATABASE IF EXISTS typoteka_3;
CREATE DATABASE typoteka_3
  WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    TEMPLATE = template0
    CONNECTION LIMIT = -1;


\connect typoteka_3;


DROP TABLE IF EXISTS articles_to_categories;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_roles;


CREATE TABLE user_roles (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    role VARCHAR(50) NOT NULL
);


CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(50) NOT NULL,
    role_id INTEGER NOT NULL,
    FOREIGN KEY (role_id) REFERENCES user_roles (id)
      ON DELETE SET NULL
      ON UPDATE SET NULL
);
CREATE unique index email_idx ON users (email);


CREATE TABLE articles (
    id bigserial PRIMARY KEY NOT NULL,
    regdate DATE NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);


CREATE TABLE images (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    article_id INTEGER NOT NULL,
    image TEXT NOT NULL,
    FOREIGN KEY (article_id) REFERENCES articles (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);


CREATE TABLE comments (
    id bigserial PRIMARY KEY NOT NULL,
    article_id INTEGER NOT NULL references articles,
    user_id INTEGER NOT NULL,
    comment TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    FOREIGN KEY (article_id) REFERENCES articles (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);


CREATE TABLE categories (
  id bigserial PRIMARY KEY NOT NULL,
  category VARCHAR(50) NOT NULL
);


CREATE TABLE articles_to_categories (
  article_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  CONSTRAINT offer_to_categories_pk PRIMARY KEY (article_id, category_id),
  FOREIGN KEY (article_id) REFERENCES articles (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
 );
