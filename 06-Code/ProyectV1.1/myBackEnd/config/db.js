const mysql = require('mysql2');  // Cambia 'mysql' a 'mysql2'

const pool = mysql.createPool({
    host: 'autorack.proxy.rlwy.net',
    user: 'root',
    password: 'GdmUDNqCjqbuDPBCYwdipQHNdOgLMRim',
    database: 'railway',
    port: 59374,
    connectionLimit: 10, // Número máximo de conexiones en el pool
});

module.exports = pool.promise();  // Esto ahora funcionará con mysql2
