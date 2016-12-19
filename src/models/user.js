const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AddressSchema = require('./address');
const CarSchema = require('./car');

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'User firstName required']
    },
    lastName: {
        type: String,
        required: [true, 'User lastName required']
    },
    pseudo: {
        type: String,
        required: [true, 'User pseudo required']
    },
    email: {
        type: String,
        required: [true, 'User email required']
    },
    password: {
        type: String,
        required: [true, 'User password required']
    },
    phoneNumber: {
        type: String,
        required: [true, 'User phone number required']
    },
    gender: {
        type: String,
        enum: ['Homme', 'Femme'],
        required: [true, 'User gender required']
    },
    birthDate: {
        type: Date,
        required: [true, 'User birthDate required']
    },
    address: {
        type: AddressSchema,
        required: [true, 'User address required']
    },
    car: {
        type: CarSchema
    },
    isDriver: {
        type: Boolean,
        required: [true, "User isDriver require"]
    }
});

module.exports = mongoose.model('User', UserSchema);