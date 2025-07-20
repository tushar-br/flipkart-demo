const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, default: 1 }
        }
    ],
    totalAmount: Number,
    paymentId: String,
    isPaid: { type: Boolean, default: true },
    paidAt: Date,
    status: { type: String, default: "Pending" },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Order", orderSchema)