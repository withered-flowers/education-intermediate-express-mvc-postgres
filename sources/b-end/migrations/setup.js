// require si pool pada config
const pool = require('../config/config.js');

const queryDrop = `DROP TABLE IF EXISTS "Identities"`;
const queryCreate = 
  `CREATE TABLE "Identities" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    "jobTitle" VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL
  )`;

pool.query(queryDrop, (err, result) => {
  if(err) {
    return console.log(err);
  }

  pool.query(queryCreate, (err, result) => {
    if(err) {
      return console.log(err);
    }

    console.log("Table berhasil dibuat");
  });
});