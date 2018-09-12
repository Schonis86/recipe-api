const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe.model');
const mongoose = require('mongoose');

router.get('/', (req, res, next) =>{
    Recipe.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err})
        });
});

router.post('/', (req, res, next) =>{
    const recipe = new Recipe({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients,
        imageUrl: req.body.imageUrl,
        category: req.body.category
    });
    recipe.save()
        .then(result => {
            console.log(result)
        })
        .catch(err => console.log(err));

    res.status(201).json({
        message: 'Handling Post request to /recipes',
        createdRecipe: recipe
    });
});

router.get('/:_id', (req, res, next) => {
    const id = req.params._id;
    Recipe.findById(id)
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


module.exports = router;