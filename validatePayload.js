const express = require('express');
const { Pool } = require('pg');

const router = express.Router();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

const validatePayload = (req, res, next) => {
    const { username, email } = req.body;
    if (!username || !email) {
        return res.status(400).json({ status: "error", message: "Username and email are required fields." });
    }
    next();
};

router.post('/register', validatePayload, async (req, res) => {
    const { username, email, age } = req.body;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        
        const insertQuery = `INSERT INTO users (username, email, age, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id`;
        const dbResult = await client.query(insertQuery, [username, email, age]);
        
        await client.query('COMMIT');
        
        res.status(201).json({
            status: "success",
            user_id: dbResult.rows[0].id
        });
        
    } catch (err) {
        await client.query('ROLLBACK');
        
        res.status(500).json({
            status: "failed",
            error_details: err.message,
            query_failed: true
        });
        
    } finally {
        client.release();
    }
});

module.exports = router;