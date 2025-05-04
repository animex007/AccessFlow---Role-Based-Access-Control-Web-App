const User = require('../models/User');
const Role = require('../models/Role');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}).populate('roles');
        res.json(users.map(user => ({
            _id: user._id,
            name: user.name,
            email: user.email,
            roles: user.roles.map(role => role.name)
        })));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('roles');

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                roles: user.roles.map(role => role.name)
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                message: 'User updated successfully'
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Assign role to user
// @route   PUT /api/users/:id/roles
// @access  Private/Admin
exports.assignUserRoles = async (req, res) => {
    try {
        const { roleIds } = req.body;

        // Validate roleIds
        if (!roleIds || !Array.isArray(roleIds)) {
            return res.status(400).json({ message: 'Role IDs must be provided as an array' });
        }

        // Check if roles exist
        const roles = await Role.find({ _id: { $in: roleIds } });
        if (roles.length !== roleIds.length) {
            return res.status(400).json({ message: 'One or more roles do not exist' });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Assign roles
        user.roles = roleIds;
        const updatedUser = await user.save();

        // Populate roles for response
        const populatedUser = await User.findById(updatedUser._id).populate('roles');

        res.json({
            _id: populatedUser._id,
            name: populatedUser.name,
            email: populatedUser.email,
            roles: populatedUser.roles.map(role => role.name),
            message: 'Roles assigned successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            await user.remove();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};