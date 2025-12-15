const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Product Controller
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ success: true, data: products });
    } catch (error) {
        res.json({ success: false, message: 'Database connection error' });
    }
};

// User Controllers
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.json({ success: false, message: 'Email not registered. Please sign up first.' });
        }
        
        if (user.password !== password) {
            return res.json({ success: false, message: 'Password is incorrect. Please type the correct password.' });
        }
        
        res.json({ success: true, user: { email: user.email, name: user.name } });
    } catch (error) {
        res.json({ success: false, message: 'Database connection error' });
    }
};

const signupUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return res.json({ success: false, message: 'Email already registered' });
        }
        
        const newUser = new User({ email, password, name: 'User' });
        await newUser.save();
        
        res.json({ success: true, message: 'Account created successfully!' });
    } catch (error) {
        res.json({ success: false, message: 'Database connection error' });
    }
};

// Order Controller
const createOrder = async (req, res) => {
    try {
        const orderId = 'FM' + Date.now();
        const newOrder = new Order({
            orderId,
            email: req.body.email,
            items: req.body.items,
            totalPrice: req.body.totalPrice,
            orderStatus: 'Pending'
        });
        
        await newOrder.save();
        res.json({ success: true, orderId, message: 'Order placed successfully!' });
    } catch (error) {
        res.json({ success: false, message: 'Database connection error' });
    }
};

module.exports = {
    getProducts,
    loginUser,
    signupUser,
    createOrder
};