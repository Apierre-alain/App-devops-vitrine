const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '../../logs');

// Create logs directory if it doesn't exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logFilePath = path.join(logsDir, 'app.log');
const errorLogFilePath = path.join(logsDir, 'error.log');

const formatLog = (level, message) => {
  return `[${new Date().toISOString()}] [${level}] ${message}\n`;
};

const info = (message) => {
  const logMessage = formatLog('INFO', message);
  console.log(logMessage);
  fs.appendFileSync(logFilePath, logMessage);
};

const error = (message) => {
  const logMessage = formatLog('ERROR', message);
  console.error(logMessage);
  fs.appendFileSync(logFilePath, logMessage);
  fs.appendFileSync(errorLogFilePath, logMessage);
};

const warn = (message) => {
  const logMessage = formatLog('WARN', message);
  console.warn(logMessage);
  fs.appendFileSync(logFilePath, logMessage);
};

const debug = (message) => {
  const logMessage = formatLog('DEBUG', message);
  console.log(logMessage);
  fs.appendFileSync(logFilePath, logMessage);
};

module.exports = {
    info,
    error,
    warn,
    debug
};