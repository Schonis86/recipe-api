const express = require('express');
const router = express.Router();




router.get('/', (res, req, next) => {
    res.status(201).json({
        message: 'Products was fethed!'
    })
});

module.exports = router;