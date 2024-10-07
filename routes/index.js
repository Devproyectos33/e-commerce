const express = require('express');

const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');

function routerApi(app){

  const router = express.Router();
  // app.use('/api/v1/products',productsRouter);  --> se puede configura de esta forma los versionamientos pero no es la indicada

  app.use('/api/v1/',router);  //   http://localhost:3000/api/v1
  router.use('/products',productsRouter); //  http://localhost:3000/api/v1/products/
  router.use('/users',usersRouter);
  router.use('/categories',categoriesRouter);
}

module.exports = routerApi;
