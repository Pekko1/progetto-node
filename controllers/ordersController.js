const Order = require('../models/Order');

exports.getAllOrders = async (req, res) => {
  try {
    const { startDate, endDate, product } = req.query;
    let query = {};

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    if (product) {
      query.products = product;
    }

    const orders = await Order.find(query);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).send("Order not found");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { user, products } = req.body;
    const newOrder = new Order({ user, products });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { user, products } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { user, products }, { new: true });
    if (updatedOrder) {
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).send("Order not found");
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (deletedOrder) {
      res.status(200).send("Order deleted");
    } else {
      res.status(404).send("Order not found");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
