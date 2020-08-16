const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  database: 'development',
  // Maksimum client yang dialokasikan
  max: 20,
  // Waktu untuk timeout ketika pg dalam kondisi idle
  idleTimeoutMillis: 1000,
  // Waktu untuk timeout ketika pg dalam waktu terkoneksi yang cukup lamaß
  connectionTimeoutMillis: 500,
});

module.exports = pool;