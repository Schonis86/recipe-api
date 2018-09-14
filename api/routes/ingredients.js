const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredient.model');
const RIngredient = require('../models/recipeIngredients.model');
const mongoose = require('mongoose');


router.get('/:_id', (req, res) => {
    const id = req.params._id;
    Ingredient.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err})
        })
});

router.get('/findByName/:name', (req, res) => {
    const name = req.params.name;
    Ingredient.findOne({'Namn': name })
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err})
        })
});


router.get('/autoComplete-ingredient-name/:firstLetters', (req, res) => {
    const start = req.params.firstLetters.toLowerCase();
   Ingredient.find()
       .exec()
       .then(doc => {
           const result = doc.filter(
               ingredient => ingredient.Namn.toLocaleLowerCase().indexOf(start) == 0
           ).map(
               ingredient => ingredient.Namn
           );
           res.json(result);
       })
});

/*router.get('/', (req, res) => {

    Ingredient.find()
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err})
        })
});*/

module.exports = router;