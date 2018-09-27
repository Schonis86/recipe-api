const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    admin: Boolean
});

module.exports = mongoose.model('User', userSchema);