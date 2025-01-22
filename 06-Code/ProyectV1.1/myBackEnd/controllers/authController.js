const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

// Variables de entorno
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '273833412389-akcr05jeal097enbjia7jgroio5hkkc0.apps.googleusercontent.com';

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const authController = {
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Por favor ingresa todos los campos',
                });
            }

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
                    message: 'Usuario no encontrado',
                });
            }

            const user = users[0];
            const isValidPassword = password === user.password; // Cambiar a bcrypt si es necesario

            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    message: 'Contraseña incorrecta',
                });
            }

            const token = jwt.sign(
                { userId: user.id, role: user.roles },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                success: true,
                message: 'Inicio de sesión exitoso',
                role: user.roles,
                id: user.id,
                token: token,
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                success: false,
                message: 'Error en el servidor',
            });
        }
    },

    googleLogin: async (req, res) => {
        const { credential } = req.body;
        try {
            const ticket = await client.verifyIdToken({
                idToken: credential,
                audience: GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();
            const email = payload.email;
            const firstName = payload.given_name;
            const lastName = payload.family_name;

            // Buscar al usuario en la base de datos
            const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

            if (user.length === 0) {
                // Si no existe el usuario, devolver datos para registro
                return res.status(200).json({
                    success: false,
                    register: true,
                    data: { firstName, lastName, email },
                });
            }

            // Generar token JWT
            const token = jwt.sign(
                { userId: user[0].id, role: user[0].id_rol },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(200).json({
                success: true,
                token,
                user: {
                    id: user[0].id,
                    role: user[0].id_rol,
                    email: user[0].email,
                },
            });
        } catch (error) {
            console.error('Error al validar el token de Google:', error.message);
            res.status(400).json({
                success: false,
                message: 'Error al validar el token de Google',
            });
        }
    },

    verifyToken: (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'No token provided',
            });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({
                success: false,
                message: 'Invalid token',
            });
        }
    },

    checkRole: (roles) => {
        return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'No tienes permisos para realizar esta acción',
                });
            }
            next();
        };
    },
};


module.exports = authController;
