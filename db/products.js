const productList = [];

let id = 0;

function all() {
  return productList;
}

function isProperData(product) {
  let data = {
    hasError: false,
    errors: []
  };

  if (!product.name) {
    data.hasError = true;
    data.errors.push('Product must have a name to be added to the list.');
  }
  if (isNaN(parseInt(product.price))) {
    data.hasError = true;
    data.errors.push('Product price must be a number to be added to the list.');
  }
  if (isNaN(parseInt(product.inventory))) {
    data.hasError = true;
    data.errors.push(
      'Inventory value must be a number to be added to the list.'
    );
  }

  if (data.hasError) {
    return data;
  }

  return true;
}

function add(product) {
  product.id = id;
  id++;

  productList.push(product);
}

function getByID(id) {
  return productList.find(product => product.id == id);
}

function editById(id, updates) {
  const index = productList.findIndex(product => product.id == id);
  const product = productList[index];

  for (let key in updates) {
    product[key] = updates[key];
  }
}

function deleteByID(id) {
  const index = productList.findIndex(product => product.id == id);
  productList.splice(index, 1);
}

module.exports = {
  all,
  isProperData,
  add,
  getByID,
  editById,
  deleteByID
};
