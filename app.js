const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const recipeRoutes = require('./api/routes/recipes');
const productRoutes = require('./api/routes/products');
const ingredientsRoutes = require('./api/routes/ingredients');
const userRoutes = require('./api/routes/users');


mongoose.connect('mongodb://localhost:27017/recipeDb', {useNewUrlParser: true});


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

app.use('/recipes', recipeRoutes);
app.use('/products', productRoutes);
app.use('/ingredients', ingredientsRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;