const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Nummer: String,
    Namn: String,
    ViktGram: String,
    Huvudgrupp: String,
    Naringsvarden: {
        Naringsvarde: []
    }
});

module.exports = mongoose.model('Ingredient', ingredientSchema);