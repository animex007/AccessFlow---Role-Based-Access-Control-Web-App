const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - Verify token
exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Check for specific role
exports.hasRole = (roleNames) => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const user = await User.findById(req.user._id).populate('roles');

        const userRoles = user.roles.map(role => role.name);

        // Check if user has any of the required roles
        const hasRequiredRole = userRoles.some(role =>
            Array.isArray(roleNames) ? roleNames.includes(role) : role === roleNames
        );

        if (!hasRequiredRole) {
            return res.status(403).json({ message: 'Not authorized, insufficient role privileges' });
        }

        next();
    };
};

// Admin middleware
exports.admin = (req, res, next) => {
    return exports.hasRole('admin')(req, res, next);
};