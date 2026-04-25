require('dotenv').config();

const log = require('./utils/logger');
const app = require('./app');

const PORT = process.env.PORT_BACKEND;

app.listen(PORT, () => {
  log.info(`Server running on port ${PORT}`);
});