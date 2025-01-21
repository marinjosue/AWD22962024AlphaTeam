// authController.js
const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// You should store this in an environment variable
const JWT_SECRET = 'your-secret-key';

const authController = {
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Validate input
            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Por favor ingresa todos los campos'
                });
            }

            // Get user with role
            const [users] = await pool.query(
                `SELECT users.id, users.first_name, users.last_name, users.password, 
                        roles.roles 
                 FROM users 
                 INNER JOIN roles ON users.id_rol = roles.id_rol 
                 WHERE users.cedula = ?`,
                [username]
            );

            if (users.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            const user = users[0];

            // Compare password
            // Note: In your case passwords are stored in plain text
            // But it's recommended to use bcrypt, I'll show both ways
            
            let isValidPassword;
            
            // If your passwords are already hashed with bcrypt
            // isValidPassword = await bcrypt.compare(password, user.password);
            
            // If your passwords are in plain text (not recommended)
            isValidPassword = password === user.password;

            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    message: 'Contraseña incorrecta'
                });
            }

            // Create JWT token
            const token = jwt.sign(
                {
                    userId: user.id,
                    role: user.roles
                },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                success: true,
                message: 'Inicio de sesión exitoso',
                role: user.roles,
                id: user.id,
                token: token
            });

        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                success: false,
                message: 'Error en el servidor'
            });
        }
    },

    // Middleware to verify JWT token
    verifyToken: (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        // Get token from Bearer header
        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }
    },

    // Middleware to check role
    checkRole: (roles) => {
        return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'No tienes permisos para realizar esta acción'
                });
            }
            next();
        };
    }
};

module.exports = authController;