const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredient.model');
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

module.exports = router;