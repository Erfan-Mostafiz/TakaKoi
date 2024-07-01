const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000; // Use environment variable or default to port 5000

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME, // In your case, 'finance_tracker'
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432, // Default PostgreSQL port
});


// Example route
app.get('/', (req, res) => {
    pool.query('SELECT version()', (err, dbRes) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.send(`PostgreSQL version: ${dbRes.rows[0].version}`);
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
