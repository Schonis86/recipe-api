const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    ingredients: [],
    imageUrl: String,
    category: String
});

module.exports = mongoose.model('Recipe', recipeSchema);