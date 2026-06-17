const express = require('express');
const cors = require('cors');

const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes');
const healthRouter = require('./routes/health');
const connectDB = require('./config/database');

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
connectDB();

// Mount API routes under /api so frontend calls to /api/* work as expected
app.use('/api', routes);

// Expose a simple health endpoint at /health (used by nginx in compose)
app.use('/health', healthRouter);

app.use(errorHandler);

module.exports = app;