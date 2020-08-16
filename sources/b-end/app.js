const express = require('express');
const app = express();

const PORT = 3000;

// Jangan lupa import routes/index.js
// Abaikan bila error pada saat pembuatan pertama
const indexRoutes = require('./routes/index.js');

// set view engine
app.set('view engine', 'ejs');
// gunakan middleware bodyParser
app.use(express.urlencoded({ extended: true }));

// Menggunakan routes dari routes/index.js
// Abaikan bila error pada saat pembuatan pertama karena file dan
// folder belum terbentuk
app.use('/', indexRoutes);

// Jalankan express
app.listen(PORT, () => {
  console.log(`Aplikasi jalan di PORT ${PORT}`);
})