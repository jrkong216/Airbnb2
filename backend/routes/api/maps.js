// backend/routes/api/maps.js
// const router = require('express').Router();
const express = require('express');
const router = express.Router();
const { googleMapsAPIKey } = require('../../config');
const { requireAuth } = require('../../utils/auth')


router.post('/key', async (req, res) => {
  return res.json({ googleMapsAPIKey });
});

module.exports = router;
