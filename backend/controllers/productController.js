const Product = require("../models/Product");

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Seed products (for initial setup)
// @route   POST /api/products/seed
// @access  Public (in production, this should be protected)
const seedProducts = async (req, res, next) => {
  try {
    await Product.deleteMany({});
    const mockProducts = require("../data/products");
    const products = await Product.insertMany(mockProducts);
    res.status(201).json({
      message: "Products seeded successfully",
      products,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  seedProducts,
};
