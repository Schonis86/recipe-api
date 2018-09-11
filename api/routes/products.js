const express = require('express');
const router = express.Router();



router.get('/'), (res, req, next) => {
    res.status(200).json({
        message: 'Products was fethed!'
    })
}


router.get('/:productName'), (res, req, next) => {
    res.status(200).json({
        message: 'Product was fetched'
    })
}

module.exports = router;