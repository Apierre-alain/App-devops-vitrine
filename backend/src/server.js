require('dotenv').config();

const log = require('./utils/logger');
const app = require('./app');

const PORT = process.env.PORT_BACKEND || 3000;

app.listen(PORT, () => {
  log.info(`Server running on port ${PORT}`);
});