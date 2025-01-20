require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const courseRoutes = require('./routes/courseRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos

// Rutas API
app.use('/api/courses', courseRoutes);

// Manejar rutas no encontradas (páginas 404)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
