const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe.model');
const Ingredient = require('../models/ingredient.model');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
    Recipe.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
});


router.post('/', (req, res) => {
    let recipe = {};

    async function saveRecipe() {
        return await Promise.all(req.body.ingredients.map(async data => {
            data.ingredient = await getIngredientFromDb(data.ingredient.Namn);
            return data;
        }))
    }

    function getIngredientFromDb(data) {
        return new Promise((resolve, reject) => {
            Ingredient.findOne({"Namn": data})
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err)
                });
        })
    }

    saveRecipe()
        .then(data => {
            recipe = new Recipe({
                _id: new mongoose.Types.ObjectId,
                ingredients: data,
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                category: req.body.category,
                instructions: req.body.instructions
            });
            recipe.save();
            res.status(200).json({
                message: 'det funkar'
            })
        });


});

router.get('/searchRecipeByName/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    Recipe.find()
        .exec()
        .then(doc => {
            const result = [];
             doc.filter(
                recipe => recipe.name.toLocaleLowerCase().indexOf(name) === 0
            ).map(
                recipe => result.push({name: recipe.name, id: recipe._id})
            );
            res.json(result);
        })
});


router.get('/:_id', (req, res) => {
    const id = req.params._id;
    Recipe.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
});

router.get('/searchRecipeByCategory/:category', (req, res) => {
const category = req.params.category;
Recipe.find({category: category})
    .exec()
    .then(doc => res.json(doc))
});


module.exports = router;