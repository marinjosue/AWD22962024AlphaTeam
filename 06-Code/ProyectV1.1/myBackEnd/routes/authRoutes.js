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
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('273833412389-akcr05jeal097enbjia7jgroio5hkkc0.apps.googleusercontent.com');
router.post('/google', async (req, res) => {
    const { credential } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: '273833412389-akcr05jeal097enbjia7jgroio5hkkc0.apps.googleusercontent.com',
        });

        const payload = ticket.getPayload();
        const email = payload.email;
        const firstName = payload.given_name;
        const lastName = payload.family_name;

        const user = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (user.length === 0) {
            return res.status(200).json({
                success: false,
                register: true,
                data: { firstName, lastName, email },
            });
        }

        const token = generarToken(user[0].id);
        return res.status(200).json({
            success: true,
            token,
            role: user[0].id_rol,
            id: user[0].id,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: 'Error al validar el token de Google' });
    }
});

module.exports = router;