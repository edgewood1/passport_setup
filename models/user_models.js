const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String 
})

// parameter: name of model (made plural in db) and name of schema (above)

const User = mongoose.model('user', userSchema);

module.exports = User;