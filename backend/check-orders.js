const mongoose = require('mongoose');
const Order = require('./models/Order');
require('dotenv').config();

const checkOrders = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        
        const orders = await Order.find({});
        console.log('Orders in database:', orders.length);
        orders.forEach(order => {
            console.log(`- ${order.orderId} | ${order.email} | ₹${order.totalPrice} | ${order.orderStatus}`);
        });
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkOrders();