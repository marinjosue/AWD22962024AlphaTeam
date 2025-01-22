// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login route
router.post('/login', authController.login);

// Example of a protected route
router.get('/protected', 
    authController.verifyToken, 
    authController.checkRole(['admin']), 
    (req, res) => {
        res.json({ 
            success: true, 
            message: 'You have access to this protected route' 
        });
    }
);
// Login google route
router.post('/google', authController.googleLogin);
module.exports = router;