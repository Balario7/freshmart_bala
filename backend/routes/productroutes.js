const express = require('express');
const router = express.Router();
const { getProducts, loginUser, signupUser, createOrder } = require('../controllers/productcontroller');

// Product routes
router.get('/products', getProducts);

// User routes
router.post('/login', loginUser);
router.post('/signup', signupUser);

// Order routes
router.post('/orders', createOrder);

// Health check
router.get('/health', (req, res) => {
    const mongoose = require('mongoose');
    const mongoConnected = mongoose.connection.readyState === 1;
    
    res.json({
        status: 'ok',
        mongoConnected,
        timestamp: new Date().toISOString()
    });
});

module.exports = router;