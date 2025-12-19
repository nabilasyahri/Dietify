const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// Port dinamis untuk Railway
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Lebih modern dibanding body-parser

// KONFIGURASI DATABASE
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false 
  }
});

// Cek koneksi database saat server nyala
pool.connect((err, client, release) => {
  if (err) {
    return console.error('KONEKSI DATABASE GAGAL:', err.stack);
  }
  console.log('KONEKSI DATABASE BERHASIL!');
  release();
});

// ROUTE: LOGIN
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
    if (user.rows.length === 0) {
      return res.status(401).json({ error: "Email atau password salah" });
    }
    res.json(user.rows[0]);
  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    res.status(500).json({ error: "Database error", detail: err.message });
  }
});

// ROUTE: REGISTER
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password]
    );
    // Langsung buat progress awal
    await pool.query(
      'INSERT INTO progress (user_id, weight_goal, current_weight, workouts_completed, calories_burned) VALUES ($1, 0, 0, 0, 0)', 
      [newUser.rows[0].id]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error("REGISTER ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ROUTE: GET PROGRESS
app.get('/api/progress/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const progress = await pool.query('SELECT * FROM progress WHERE user_id = $1', [userId]);
    res.json(progress.rows[0] || {});
  } catch (err) {
    console.error("GET PROGRESS ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ROUTE: GET SCHEDULE
app.get('/api/schedule/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const schedule = await pool.query('SELECT * FROM schedules WHERE user_id = $1 ORDER BY id DESC', [userId]);
    res.json(schedule.rows);
  } catch (err) {
    console.error("GET SCHEDULE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ROUTE: POST SCHEDULE
app.post('/api/schedule', async (req, res) => {
  const { user_id, day, time, meal_plan, workout_plan } = req.body;
  try {
    const newSchedule = await pool.query(
      'INSERT INTO schedules (user_id, day, time, meal_plan, workout_plan) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [user_id, day, time, meal_plan, workout_plan]
    );
    res.json(newSchedule.rows[0]);
  } catch (err) {
    console.error("POST SCHEDULE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ROUTE: UPDATE PROGRESS
app.put('/api/progress', async (req, res) => {
  const { user_id, weight_goal, current_weight, workouts_completed, calories_burned } = req.body;
  try {
    const update = await pool.query(
      'UPDATE progress SET weight_goal=$1, current_weight=$2, workouts_completed=$3, calories_burned=$4 WHERE user_id=$5 RETURNING *',
      [weight_goal, current_weight, workouts_completed, calories_burned, user_id]
    );
    res.json(update.rows[0]);
  } catch (err) {
    console.error("UPDATE PROGRESS ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Root route untuk testing
app.get("/", (req, res) => {
  res.send("Backend Dietify Online!");
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});