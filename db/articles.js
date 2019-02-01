const articleList = [];

function all() {
  return articleList;
}

function isProperData(article) {
  let data = {
    hasError: false,
    errors: []
  };

  if (!article.title) {
    data.hasError = true;
    data.errors.push('Article must have a title to be added to the list.');
  }
  if (!article.body) {
    data.hasError = true;
    data.errors.push('Article must have a body to be added to the list.');
  }
  if (!article.author) {
    data.hasError = true;
    data.errors.push('Article must have a author to be added to the list.');
  }

  if (data.hasError) {
    return data;
  }

  return true;
}

function add(article) {
  article.urlTitle = encodeURI(article.title);
  articleList.push(article);
}

function getByUrlTitle(urlTitle) {
  return articleList.find(article => article.urlTitle === urlTitle);
}

function editByUrlTitle(urlTitle, updates) {
  const index = articleList.findIndex(article => article.urlTitle === urlTitle);
  const article = articleList[index];

  for (let key in updates) {
    article[key] = updates[key];
  }
}

function deleteByUrlTitle(urlTitle) {
  const index = articleList.findIndex(article => article.urlTitle === urlTitle);
  articleList.splice(index, 1);
}

module.exports = {
  all,
  isProperData,
  add,
  getByUrlTitle,
  editByUrlTitle,
  deleteByUrlTitle
};
