const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user.model');

router.post('/', (req, res) => {
    const user = req.body.username;
    const password = req.body.password;

    User.findOne({username: user})
        .exec()
        .then(data => {
            if (data.password === password) {
                res.status(200).json({user: true})
            } else {
                res.status(500).json({error: 'Username or password'})
            }
        }).catch(error => {
            console.log(error);
    })
});

router.post('/save', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

  let user = new User({
      _id: new mongoose.Types.ObjectId,
      username: username,
      password: password
  });

    user.save(user);

});

module.exports = router;