const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser'); 

const recipeRoutes = require('./api/routes/recipes');
const productRoutes = require('./api/routes/products');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((res, req, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'origin  , X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET ');
        return res.status(200).json({})
    }
    next();
})


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