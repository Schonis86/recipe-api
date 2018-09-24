const mongoose = require('mongoose');
const Ingredient = require('../models/ingredient.model');


const recipeIngredientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ingredient: {},
    qty: Number,
    measure: String,
    qtyInGrams: Number


});

module.exports = mongoose.model('R_Ingredient', recipeIngredientSchema);