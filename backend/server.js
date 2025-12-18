const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import routes
const apiRoutes = require('./routes/productroutes');

const app = express();
app.use(cors({
  origin: ['https://freshmartbala.vercel.app', 'http://localhost:3001', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/freshmart';
console.log('Attempting to connect to MongoDB...');
console.log('Connection URI:', mongoUri.replace(/:\/\/([^:]+):([^@]+)@/, '://***:***@'));

const mongoOptions = {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,
  retryWrites: true,
  maxPoolSize: 10,
  minPoolSize: 2
};

mongoose.connect(mongoUri, mongoOptions)
  .then(() => {
    console.log('✓ MongoDB connected successfully');
  })
  .catch(err => {
    console.error('✗ MongoDB connection error:', err.message);
    console.log('⚠ Server will work with fallback in-memory storage');
  });
  
// Root API
app.get('/', (req, res) => {
    const mongoConnected = mongoose.connection.readyState === 1;
    res.json({ 
        success: true, 
        message: 'FreshMart Backend Server is running',
        mongoConnected,
        storage: mongoConnected ? 'MongoDB' : 'In-Memory'
    });
});

// Use API routes
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3003;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


module.exports = app;
