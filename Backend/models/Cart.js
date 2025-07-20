const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, default: 1 }
        }
    ]
})

module.exports = mongoose.model("Card", cardSchema)