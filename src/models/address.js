const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    street: {
        type: String,
        required: true
    },
    streetNumber: {
        type: Number,
        required: true
    },
    PostalCode: {
        type: String,
        required: true
    },
    Country: {
        type: String,
        required: true
    }
});