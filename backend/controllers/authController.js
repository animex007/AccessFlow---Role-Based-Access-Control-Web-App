const User = require('../models/User');
const Role = require('../models/Role');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Find default user role
        const userRole = await Role.findOne({ name: 'user' });
        if (!userRole) {
            return res.status(500).json({ message: 'Default role not found. Please contact administrator.' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            roles: [userRole._id]
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                roles: [userRole.name],
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for user
        const user = await User.findOne({ email }).populate('roles');

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                roles: user.roles.map(role => role.name),
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('roles');

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                roles: user.roles.map(role => role.name),
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
    exports.signup = async (req, res) => {
        try {
            console.log("Signup request body:", req.body); // Add this line
            // rest of your signup code...
        } catch (error) {
            console.error(error); // See what's going wrong
            res.status(500).json({ message: "Something went wrong" });
        }
    };

};