-- Получить список всех категорий (идентификатор, наименование категории);
SELECT * FROM categories;


-- Получить список категорий для которых создана минимум одна публикация (идентификатор, наименование категории);
SELECT
  categories.id AS "идентификатор",
  categories.category AS "наименование категории"
FROM categories
  INNER JOIN articles_to_categories
  ON categories.id = articles_to_categories.category_id
GROUP BY
  categories.id,
  categories.category
HAVING
  COUNT (articles_to_categories.category_id) > 0
ORDER BY categories.id;


-- Получить список категорий с количеством публикаций (идентификатор, наименование категории, количество публикаций в категории);
SELECT
  categories.id AS "идентификатор",
  categories.category AS "наименование категории",
  COUNT (articles_to_categories.category_id) AS "количество объявлений в категории"
FROM categories
  INNER JOIN articles_to_categories
  ON categories.id = articles_to_categories.category_id
GROUP BY
  categories.id,
  categories.category
ORDER BY categories.id;


--Получить список публикаций (идентификатор публикации, заголовок публикации, анонс публикации, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий). Сначала свежие публикации;
SELECT
  articles.id AS "идентификатор объявления",
  articles.title AS "заголовок публикации",
  articles.description AS "анонс публикации",
  articles.regdate AS "дата публикации",
  concat(users.firstname, ' ', users.lastname) AS "имя и фамилия автора",
  users.email AS "контактный email",
  (SELECT COUNT(*) FROM comments WHERE articles.id = comments.article_id) AS "количество комментариев",
  STRING_AGG(categories.category, ', ') AS "наименование категорий"
FROM articles_to_categories
  LEFT JOIN articles
    ON articles.id = articles_to_categories.article_id
  LEFT JOIN categories
    ON categories.id = articles_to_categories.category_id
  INNER JOIN users
    ON users.id = articles.user_id
GROUP BY
  articles.id,
  articles.title,
  articles.description,
  articles.regdate,
  users.firstname,
  users.lastname,
  users.email
ORDER BY
  articles.regdate DESC;


-- Получить полную информацию определённой публикации (идентификатор публикации, заголовок публикации, анонс, полный текст публикации, дата публикации, путь к изображению, имя и фамилия автора, контактный email, количество комментариев, наименование категорий);
SELECT
  articles.id AS "идентификатор объявления",
  articles.title AS "заголовок публикации",
  articles.description AS "анонс публикации",
  articles.regdate AS "дата публикации",
  concat(users.firstname, ' ', users.lastname) AS "имя и фамилия автора",
  users.email AS "контактный email",
  (SELECT COUNT(*) FROM comments WHERE articles.id = comments.article_id) AS "количество комментариев",
  STRING_AGG(categories.category, ', ') AS "наименование категорий"
FROM articles_to_categories
  LEFT JOIN articles
    ON articles.id = articles_to_categories.article_id AND articles.id = 2
  LEFT JOIN categories
    ON categories.id = articles_to_categories.category_id
  INNER JOIN users
    ON users.id = articles.user_id
GROUP BY
  articles.id,
  articles.title,
  articles.description,
  articles.regdate,
  users.firstname,
  users.lastname,
  users.email
ORDER BY
  articles.regdate DESC;


-- Получить список из 5 свежих комментариев (идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария);
SELECT
  comments.id AS "идентификатор комментария",
  comments.article_id AS "идентификатор объявления",
  concat(users.firstname, ' ', users.lastname) AS "имя и фамилия автора",
  comments.comment AS "текст комментария"
FROM comments
  INNER JOIN users
    ON users.id = comments.user_id
ORDER BY
  comments.id DESC
LIMIT 5;


-- Получить список комментариев для определённого объявления (идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария). Сначала новые комментарии;
SELECT
  comments.id AS "идентификатор комментария",
  comments.article_id AS "идентификатор объявления",
  concat(users.firstname, ' ', users.lastname) AS "имя и фамилия автора",
  comments.comment AS "текст комментария"
FROM comments
  INNER JOIN users
    ON users.id = comments.user_id
WHERE comments.article_id = 3
ORDER BY
  comments.id DESC;


-- Обновить заголовок определённой публикации на «Как я встретил Новый год»;
UPDATE articles
  SET title = 'Как я встретил Новый год'
WHERE
  articles.id = 3;
