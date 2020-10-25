const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    pay: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Postings = mongoose.model('Postings', JobSchema);

module.exports = Postings;