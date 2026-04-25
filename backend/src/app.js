const express = require('express');

const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes');
const connectDB = require('./config/database');

const app = express();
app.use(express.json());
connectDB();

app.use(routes);
app.use(errorHandler);

module.exports = app;