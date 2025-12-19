const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();

// Port dinamis untuk Railway, kalau di lokal pakai 5000
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// KONFIGURASI DATABASE (pakai DATABASE_URL dari railway)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // untuk neon
  }
});

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password]
    );
    // Pastikan tabel progress sudah kamu buat di Neon SQL Editor tadi
    await pool.query('INSERT INTO progress (user_id, weight_goal, current_weight, workouts_completed, calories_burned) VALUES ($1, 0, 0, 0, 0)', [newUser.rows[0].id]);
    
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
    if (user.rows.length === 0) {
      return res.status(401).json("Email atau password salah");
    }
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/api/progress/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await pool.query('SELECT * FROM progress WHERE user_id = $1', [userId]);
    res.json(progress.rows[0]);
  } catch (err) { console.error(err.message); }
});

app.get('/api/schedule/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const schedule = await pool.query('SELECT * FROM schedules WHERE user_id = $1 ORDER BY id DESC', [userId]);
    res.json(schedule.rows);
  } catch (err) { console.error(err.message); }
});

app.post('/api/schedule', async (req, res) => {
    const { user_id, day, time, meal_plan, workout_plan } = req.body;
    try {
        const newSchedule = await pool.query(
            'INSERT INTO schedules (user_id, day, time, meal_plan, workout_plan) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user_id, day, time, meal_plan, workout_plan]
        );
        res.json(newSchedule.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Gagal menyimpan jadwal');
    }
});

app.put('/api/progress', async (req, res) => {
    const { user_id, weight_goal, current_weight, workouts_completed, calories_burned } = req.body;
    try {
        const update = await pool.query(
            'UPDATE progress SET weight_goal=$1, current_weight=$2, workouts_completed=$3, calories_burned=$4 WHERE user_id=$5 RETURNING *',
            [weight_goal, current_weight, workouts_completed, calories_burned, user_id]
        );
        res.json(update.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Gagal update progress');
    }
});

// Route pengetesan agar kamu tahu server jalan
app.get("/", (req, res) => {
  res.send("Backend Dietify Berhasil Jalan di Railway!");
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});