const winston = require('winston');
const path = require('path');

const logsDir = path.join(__dirname, '../../logs');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => `[${timestamp}] [${level.toUpperCase()}] ${message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logsDir, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(logsDir, 'app.log') })
  ],
});

module.exports = {
  info: (msg) => logger.info(typeof msg === 'string' ? msg : JSON.stringify(msg)),
  error: (msg) => logger.error(typeof msg === 'string' ? msg : JSON.stringify(msg)),
  warn: (msg) => logger.warn(typeof msg === 'string' ? msg : JSON.stringify(msg)),
  debug: (msg) => logger.debug(typeof msg === 'string' ? msg : JSON.stringify(msg)),
};