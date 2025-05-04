const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    assignUserRoles
} = require('../controllers/userController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/')
    .get(protect, admin, getUsers);

router.route('/:id')
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser);

router.route('/:id/roles')
    .put(protect, admin, assignUserRoles);

module.exports = router;