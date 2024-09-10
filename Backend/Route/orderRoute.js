const express = require("express");

const { createOrder, getAllOrders, getOrderByUser, deleteOrder, updateOrderedProduct } = require("../Controller/orderController");
const { createOrderRequest, getOrderRequestById, getOrderRequest, createPaymentIntent, updateOrderRequest, getOrderRequestByUser } = require("../Controller/orderRequestController");
const { jwtMiddleware } = require("../middleware/Middleware");
const router = express.Router();

router.post("/create-order", createOrder);
router.get("/get-order", getAllOrders);
router.get("/get-order/:userId", getOrderByUser);
router.delete("/delete-order/:orderId", deleteOrder);
router.put("/update-order/:orderId", updateOrderedProduct);

router.post('/order-request', createOrderRequest);
router.get('/order-request', getOrderRequest);

router.get('/order-request/:id', getOrderRequestById);
router.get('/order-request/user/:userId', getOrderRequestByUser);


router.put('/stripe-payment', createPaymentIntent);
router.put('/order-request/:id', updateOrderRequest)




module.exports = router;