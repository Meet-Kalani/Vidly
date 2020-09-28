const mongoose = require('mongoose');
const { customerSchema } = require('./customers');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: customerSchema,
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true
            },
            dailyRentalRate: {
                type: Number,
                required: true
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

module.exports = mongoose.model('rental', rentalSchema);