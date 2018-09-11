const express = require('express');
const app = express();
const morgan = require('morgan');

const recipeRoutes = require('./api/routes/recipes');
const productRoutes = require('./api/routes/products');

app.use(morgan('dev'));

app.use('recipes', recipeRoutes);
app.use('products', productRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;