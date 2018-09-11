const express = require('express')
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Handling Get request to /recipes'
    });
});

router.post('/', (req, res, next) =>{
    const recipe = {
        recipeName: req.body.recipeName,
        category: req.body.category,
        description: req.body.description,
        ingredients: req.body.ingredients
    }
    res.status(200).json({
        message: 'Handling Post request to /recipes'
    });
});

router.get('/:name', (req, res, next) => {

});


module.exports = router;