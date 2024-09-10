const OrderModel = require("../Model/orderModel");
const mongoose = require('mongoose');

exports.createOrder = async (req, res) => {
  const { userId, productId, totalOrder } = req.body;

  const orderCreate = new OrderModel({
    user: userId,
    product: productId,
    totalOrder: totalOrder,
  });

  if (!orderCreate) {
    return res.status(400).json({ error: "Failed to create order" });
  }

  orderCreate.save();
  return res.status(200).json({ message: "Order created successfully" });
};

exports.getAllOrders = async (req, res) => {
  const { sortBy, limit, sortOrder } = req.query;

  const sort_by = sortBy ? sortBy : "createdAt";
  const total = limit ? limit : 100000000;
  const sort_order = sortOrder ? sortOrder : "asc";

  const orders = await OrderModel.find()
    .populate("user", "userDetail email")
    .populate("product")
    .sort([[sort_by, sort_order]])
    .limit(total);

  if (!orders) {
    return res.status(400).json({ error: "Error" });
  }

  return res.send(orders);
};

exports.getOrderByUser = async (req, res) => {
  const { sortBy, limit, sortOrder } = req.query;

  const sort_by = sortBy ? sortBy : "createdAt";
  const total = limit ? limit : 100000000;
  const sort_order = sortOrder ? sortOrder : "asc";

  const { userId } = req.params;

  const orders = await OrderModel.find({ user: userId })
    .select("-user")
    // .populate('user', 'userDetail email')
    .populate("product")
    .sort([[sort_by, sort_order]])
    .limit(total);

  return res.send(orders);
};

exports.deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  const order = await OrderModel.findByIdAndDelete(orderId);

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  if (!order) {
    return res.status(400).json({ error: "Order not found" });
  }
  return res.status(200).json({ message: "Order deleted" });
};



exports.updateOrderedProduct = async (req, res) => {
  const { orderId: _id } = req.params
  const { totalOrder } = req.body;

  const order = await OrderModel.findByIdAndUpdate(
    _id,
    { totalOrder },
    { new: true }
  );
  if (!order) {
    return res.status(400).json({ error: "Order not found" })
  }
  const updateOrder = await order.populate("product")
  res.send(updateOrder)
}

exports.deleteOrderedProduct = async (req, res) => {
  const { orderId: _id } = req.params
  const order = await OrderModel.findByIdAndDelete(_id);
  return res.status(200).json({ error: "Order deleted successfully" })
}