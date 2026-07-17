import express from 'express';
import Product from '../models/productModel.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // 1. IMPORT MIDDLEWARE

const router = express.Router();

// @desc    Fetch all products (Public route)
// @route   GET /api/products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching products' });
    }
});

// @desc    Fetch a single product by ID
// @route   GET /api/products/:id
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Invalid product ID format' });
    }
});

// @desc    Create a new product (Private / Admin Only route)
// @route   POST /api/products
// NOTICE: protect and admin middleware are placed right before the route code executes!
router.post('/', protect, admin, async (req, res) => {
    try {
        const { name, image, description, price, countInStock } = req.body;

        const product = new Product({
            name,
            image,
            description,
            price,
            countInStock,
            user: req.user._id // Links the product to the admin user who created it
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server error creating product' });
    }
});

export default router;