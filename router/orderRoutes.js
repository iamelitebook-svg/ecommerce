import express from 'express';
import Order from '../models/ordemodule.js'; // Matches your exact filename spelling
import User from '../models/usermodule.js';

const router = express.Router();

// @desc    Create new order (Checkout)
// @route   POST /api/orders
router.post('/', async (req, res) => {
    try {
        const {
            userId, // We pass the logged-in user's ID
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items inside cart' });
        }

        // Create a new order document in MongoDB
        const order = new Order({
            userId,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: 'Server error creating order', error: error.message });
    }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
router.get('/:id', async (req, res) => {
    try {
        // .populate('user', 'name email') automatically fetches the user's name and email details using their reference ID
        const order = await Order.findById(req.params.id).populate('userId', 'name email');

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error retrieving order' });
    }
});

// @desc    Update order to paid status
// @route   PUT /api/orders/:id/pay
router.put('/:id/pay', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('userId','name email');

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            // This paymentResult data would come back from payment processors like Stripe or PayPal
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address
            };

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error updating payment status' });
    }
});

// @desc    Get all orders (Admin Panel Utility)
// @route   GET /api/orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving dashboard analytics data.' });
  }
});

export default router;