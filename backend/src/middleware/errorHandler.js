const log = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    const code = err.status || err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(code).json({
        error: message,
        timestamp: new Date().toISOString(),
    });
    log.error(`[${new Date().toISOString()}] Error:`, err);
}

module.exports = errorHandler;
