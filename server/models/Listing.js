const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const listingSchema = new Schema({
    cardId: {
        type: String,
        required: true,
        trim: true,
    },
    cardName: {
        type: String,
        required: true,
        trim: true,
    },
    cardImage: {
        type: String,
        required: true,
    },
    cardType: {
        type: String,
        required: true,
    },
    superType: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    seller: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
});

const Listing = model('Listing', listingSchema);

module.exports = Listing;