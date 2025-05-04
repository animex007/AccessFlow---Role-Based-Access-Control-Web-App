const express = require('express');
const router = express.Router();
const { register, login, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getUserProfile);

module.exports = router;