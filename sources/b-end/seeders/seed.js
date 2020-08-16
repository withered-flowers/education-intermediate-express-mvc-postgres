const fs = require('fs');
// require si pool pada config
const pool = require('../config/config.js');

// Sesuaikan path dengan tempat memanggil seed.js ini nantinya
fs.readFile('./data/dummy.json', 'utf8', (err, data) => {
  if(err) {
    return console.log(err);
  }

  // Query untuk insertnya
  let queryInsert = 
    `INSERT INTO "Identities" (name, "jobTitle", phone, address) VALUES `;
  
  // Array data insertnya
  let arrDataInsert = [];

  data = JSON.parse(data);
  
  // Bentuk data insertnya
  data.forEach((element) => {
    let eachDataInsert = `('${element.name}', '${element.jobTitle}', '${element.phone}', '${element.address}')`;
    arrDataInsert.push(eachDataInsert);
  });

  // Finalisasi querynya
  queryInsert += arrDataInsert.join(',');

  pool.query(queryInsert, (err, result) => {
    if(err) {
      return console.log(err);
    }

    console.log("Data berhasil dimasukkan");
  });
});