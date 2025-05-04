const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Role = require('../models/Role');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Predefined roles with their permissions
const roles = [
    {
        name: 'admin',
        description: 'Administrator with full access',
        permissions: [
            'user:create', 'user:read', 'user:update', 'user:delete',
            'role:create', 'role:read', 'role:update', 'role:delete'
        ]
    },
    {
        name: 'manager',
        description: 'Manager with access to user management',
        permissions: [
            'user:read', 'user:update'
        ]
    },
    {
        name: 'user',
        description: 'Regular user with limited access',
        permissions: [
            'user:read'
        ]
    }
];

// Function to seed roles
const seedRoles = async () => {
    try {
        // Clear existing roles
        await Role.deleteMany({});

        // Insert new roles
        await Role.insertMany(roles);

        console.log('Roles seeded successfully');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Run the seeder
seedRoles();