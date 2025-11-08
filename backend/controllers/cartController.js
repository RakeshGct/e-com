const Cart = require("../models/Cart");
const Product = require("../models/Product");

const MOCK_USER_ID = "mock-user-123";

// @desc    Get cart
// @route   GET /api/cart
// @access  Public
const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ userId: MOCK_USER_ID }).populate(
      "items.productId"
    );

    if (!cart) {
      cart = await Cart.create({ userId: MOCK_USER_ID, items: [] });
    }

    // Calculate total
    const total = cart.items.reduce((sum, item) => {
      return sum + item.productId.price * item.quantity;
    }, 0);

    cart.total = total;
    await cart.save();

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Public
const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    // Get or create cart
    let cart = await Cart.findOne({ userId: MOCK_USER_ID });
    if (!cart) {
      cart = await Cart.create({ userId: MOCK_USER_ID, items: [] });
    }

    // Check if item already in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    await cart.populate("items.productId");

    // Calculate total
    const total = cart.items.reduce((sum, item) => {
      return sum + item.productId.price * item.quantity;
    }, 0);

    cart.total = total;
    await cart.save();

    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
// @access  Public
const updateCartItem = async (req, res, next) => {
  try {
    const { id } = req.params; // cart item _id
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Valid quantity is required" });
    }

    const cart = await Cart.findOne({ userId: MOCK_USER_ID });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.id(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate("items.productId");

    // Calculate total
    const total = cart.items.reduce((sum, item) => {
      return sum + item.productId.price * item.quantity;
    }, 0);

    cart.total = total;
    await cart.save();

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Public
const removeFromCart = async (req, res, next) => {
  try {
    const { id } = req.params; // cart item _id

    const cart = await Cart.findOne({ userId: MOCK_USER_ID });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove item using pull
    cart.items.pull(id);
    await cart.save();
    await cart.populate("items.productId");

    // Calculate total
    const total = cart.items.reduce((sum, item) => {
      return sum + item.productId.price * item.quantity;
    }, 0);

    cart.total = total;
    await cart.save();

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Public
const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: MOCK_USER_ID });
    if (cart) {
      cart.items = [];
      cart.total = 0;
      await cart.save();
    }
    res.json({ message: "Cart cleared" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
