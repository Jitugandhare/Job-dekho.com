// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const stockRoutes = require('./routes/stocks.route.js');
const authRoutes = require('./routes/auth.route.js');
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());


app.use('/user/auth', authRoutes);
app.use('/user/stocks', stockRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



























