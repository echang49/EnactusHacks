const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
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