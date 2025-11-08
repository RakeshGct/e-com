const Order = require("../models/Order");
const Cart = require("../models/Cart");

const MOCK_USER_ID = "mock-user-123";

// @desc    Process checkout
// @route   POST /api/checkout
// @access  Public
const checkout = async (req, res, next) => {
  try {
    const { customerName, customerEmail, cartItems } = req.body;

    // Validation
    if (!customerName || !customerEmail) {
      return res.status(400).json({
        message: "Customer name and email are required",
      });
    }

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // Calculate total
    const total = cartItems.reduce((sum, item) => {
      return sum + item.productId.price * item.quantity;
    }, 0);

    // Create order
    const orderItems = cartItems.map((item) => ({
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      quantity: item.quantity,
    }));

    const order = await Order.create({
      userId: MOCK_USER_ID,
      customerName,
      customerEmail,
      items: orderItems,
      total,
    });

    // Clear cart after successful order
    const cart = await Cart.findOne({ userId: MOCK_USER_ID });
    if (cart) {
      cart.items = [];
      cart.total = 0;
      await cart.save();
    }

    // Return mock receipt
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      receipt: {
        orderId: order._id,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        items: order.items,
        total: order.total.toFixed(2),
        orderDate: order.orderDate,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkout,
};
