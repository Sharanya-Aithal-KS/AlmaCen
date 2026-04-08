require('dotenv').config();
const authRoutes = require('./routes/auth');


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const inventoryRoutes = require('./routes/inventory');
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

// Routes
app.use('/api/inventory', inventoryRoutes);
// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/inventory_db';
mongoose.connect('mongodb://127.0.0.1:27017/inventory_db')
  .then(() => console.log('MongoDB connected to inventory_db'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});