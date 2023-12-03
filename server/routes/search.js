const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/search', async (req, res) => {
  try {
    const query = req.query.query;
    const users = await User.find({ username: { $regex: query, $options: 'i' } });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
