const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');
const cors = require('cors');

const recipeRoutes = require('./api/routes/recipes');
const productRoutes = require('./api/routes/products');
const ingredientsRoutes = require('./api/routes/ingredients');


mongoose.connect('mongodb://localhost:27017/recipeDb',{ useNewUrlParser: true });


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());
/*app.use((res, req, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin  , X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET ');
        return res.status(200).json({})
    }
    next();
});*/


app.use('/recipes', recipeRoutes);
app.use('/products', productRoutes);
app.use('/ingredients', ingredientsRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;