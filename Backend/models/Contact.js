const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    comment: {
        type: String
    },
})

module.exports = mongoose.model("Contact", contactSchema)