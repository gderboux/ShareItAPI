const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    phoneNumber: String,
    gender: String,
    age: Number
});

module.exports = mongoose.model('User', UserSchema, 'User');