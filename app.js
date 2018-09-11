const express = require('express');
const app = express();

const recipeRoutes = require('./api/routes/recipes');
const productRoutes = require('./api/routes/products');


app.use('recipes', recipeRoutes);
app.use('products', productRoutes);


module.exports = app;