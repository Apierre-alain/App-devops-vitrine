const mongoose = require('mongoose');
const log = require('../utils/logger');



const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    await mongoose.connect(mongoURI);
    log.info('MongoDB connected');
  } catch (err) {
    log.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;