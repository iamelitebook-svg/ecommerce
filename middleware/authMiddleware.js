import jwt from 'jsonwebtoken';
import User from '../models/usermodule.js';

const protect = async (req, res, next) => {
    let token;

    // Check if token exists in the Authorization header (Format: Bearer <token>)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Split the "Bearer" string away to isolate the token string
            token = req.headers.authorization.split(' ')[1];

            // Decode and verify the token signature using your JWT secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch user profile from DB using decoded ID (exclude password field)
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Move forward to the route controller logic safely
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

// Middleware to verify if the authenticated user is an Admin
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};

export { protect, admin };