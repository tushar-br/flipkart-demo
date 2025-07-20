const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const router = express.Router();

const razorpay = new Razorpay({
    key_id: "rzp_test_CX6ogsI40DaCqz",
    key_secret: "Eh8GPPfONYZPZSoxvsF0qWc1" 
});


router.post("/create-order", async (req, res) => {

    const { userId, amount } = req.body;
console.log(amount,"amount");

    const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`
    }

    const order = await razorpay.orders.create(options)

    res.json(order)
})

router.post("/verify-payment", async (req, res) => {
    const { orderId, paymentId, signature  } = req.body;

    const generatedSignature = crypto
        .createHmac("sha256", "Eh8GPPfONYZPZSoxvsF0qWc1")
        .update(orderId + "|" + paymentId)
        .digest("hex");

    if (generatedSignature === signature) {
        res.json({ success: true })

    } else {
        res.status(400).json({ success: false })
    }
})

router.post("/", async (req, res) => {
    const { userId, paymentId, isPaid, paidAt } = req.body;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce(
        (acc, item) => acc + item.productId.price * item.quantity, 0
    );

    const newOrder = new Order({
        userId,
        items: cart.items,
        totalAmount,
        paymentId,
        isPaid,
        paidAt,
        status: "Pending"
    });

    await newOrder.save();

    res.status(200).json({ message: "Order Placed", order: newOrder });
});

router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("Fetch user orders error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/admin", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("Fetch admin orders error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:orderId/status", async (req, res) => {
  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    )
      .populate("userId", "name email")
      .populate("items.productId");

    if (!order) return res.status(404).json({ error: "Order not found" });

    res.json({ message: "Order status updated", order });
  } catch (err) {
    console.error("Update status error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;