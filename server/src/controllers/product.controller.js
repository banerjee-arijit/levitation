import { Product } from "../models/product.model.js";

// Add product (protected)
const addProduct = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const newProduct = await Product.create({
      name,
      price,
      quantity,
      user: req.userId,
    });
    return res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get products for current user (protected)
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ success: true, products });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, getProducts };
