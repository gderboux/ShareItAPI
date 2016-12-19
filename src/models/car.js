const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    vin: {
        type: String,
        required: [true, 'Car VIN required']
    },
    description: {
        type: String,
    },
    SeatNumber: {
        type: Number,
        required: [true, 'Car seat number required']
    },
    color: {
        type: String,
        required: [true, 'Car color required']
    },
    brand: {
        type: String,
        required: [true, 'Car brand required']
    }
});