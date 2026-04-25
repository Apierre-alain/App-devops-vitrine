const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: "Bienvenue sur l'API DevOps" });
});

router.get('/health', (req, res) => {
  res.json({ status: "OK", mongodb: "connected" });
});

module.exports = router;