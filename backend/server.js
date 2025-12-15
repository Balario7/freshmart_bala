const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import routes
const apiRoutes = require('./routes/productroutes');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/freshmart';
console.log('Attempting to connect to MongoDB...');

const mongoOptions = {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
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

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}

module.exports = app;
