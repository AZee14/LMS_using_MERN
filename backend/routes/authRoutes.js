const express = require('express');
const router = express.Router();
const { register, login, bootstrapAdmin } = require('../controllers/authController');

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/bootstrap-admin
router.post('/bootstrap-admin', bootstrapAdmin);

module.exports = router;
