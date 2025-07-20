const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();


router.post("/add", async (req, res) => {
    const { userId, productId } = req.body;

    if (!userId || !productId) return res.status(400).json({ error: "UserId and productId requires" });

    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push({ productId, quantity: 1 });
    }

    await cart.save();

    res.json(cart)
})

router.get("/:userId", async (req, res) => {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId");

    if (!cart) return res.json({ items: [] });

    res.json(cart);

})

router.delete("/:userId", async (req, res) => {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });
    cart.items = []; // Clear all items
    await cart.save();

    res.json({ success: true, message: "Cart cleared" });
})
// Update quantity of product in cart
router.put("/:userId/update/:productId", async (req, res) => {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
        return res.status(400).json({ error: "Quantity must be at least 1" });
    }

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) return res.status(404).json({ error: "Cart not found" });

        const item = cart.items.find(item => item.productId.toString() === productId);
        if (!item) return res.status(404).json({ error: "Product not found in cart" });

        item.quantity = quantity;

        await cart.save();
        const updatedCart = await Cart.findOne({ userId }).populate("items.productId");
        res.json(updatedCart);
    } catch (err) {
        console.error("Update quantity error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});




module.exports = router

