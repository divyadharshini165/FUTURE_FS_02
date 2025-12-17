const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// PLACE ORDER
router.post("/place", async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    const order = new Order({
      user: userId,
      items,
      totalAmount,
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET USER ORDERS
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
