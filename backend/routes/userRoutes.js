const express = require('express');
const router = express.Router();
const {
  getUsers,
  deleteUser,
  getProfile,
  getAnalytics,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// Protected routes
router.get('/profile', protect, getProfile);
router.get('/analytics', protect, authorize('admin'), getAnalytics);
router.get('/', protect, authorize('admin'), getUsers);
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;
