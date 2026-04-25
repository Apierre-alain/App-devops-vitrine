const express = require('express');

const itemsRouter = require('./items');
const userRouter = require('./users');
const healthRouter = require('./health');
const router = express.Router();

router.use('/items', itemsRouter);
router.use('/users', userRouter);
router.use('/', healthRouter);

module.exports = router;