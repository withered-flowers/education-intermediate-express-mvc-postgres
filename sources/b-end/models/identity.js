const pool = require('../config/config.js');

class Identity {
  constructor(id, name, jobTitle, phone, address) {
    this.id = id;
    this.name = name;
    this.jobTitle = jobTitle;
    this.phone = phone;
    this.address = address;
  }

  // CRUD of Identity

  // SELECT ALL
  static findAll(callback) {
    const query = `SELECT id,name,"jobTitle",phone,address FROM "Identities"`;
    
    pool.query(query, (err, result) => {
      if(err) {
        callback(err, null);
      }
      else {
        let finalResult = result.rows.map((element) => {
          return new Identity(
            element.id, 
            element.name, 
            element.jobTitle, 
            element.phone, 
            element.address
          );
        });

        callback(null, finalResult);
      }
    });
  }

  // INSERT
  static create(objIdentity, callback) {
    let query = `INSERT INTO "Identities" (name,"jobTitle",phone,address) VALUES `;
    query += `('${objIdentity.name}','${objIdentity.jobTitle}','${objIdentity.phone}','${objIdentity.address}') `;
    // Apabila membutuhkan hasil kembalian (hanya berlaku pada postgres)
    query += `RETURNING *`;

    pool.query(query, (err, result) => {
      if(err) {
        callback(err, null);
      }
      else {
        callback(null, result.rows);
      }
    });
  }

  // UPDATE
  static findOne(id, callback) {

  }

  static update(objIdentity, callback) {

  }

  // DELETE
  static destroy(id, callback) {
    const query = `DELETE FROM "Identities" WHERE id=${id} RETURNING *`;

    pool.query(query, (err, result) => {
      if(err) {
        callback(err, null);
      }
      else {
        callback(null, result.rows);
      }
    });
  }
}

module.exports = Identity;

// Debugging findAll
// Identity.findAll((err, data) => {
//   if(err) throw err;
//   console.log(data);
// });

// Debugging insert
// let objIdentity = {
//   name: "Testing",
//   jobTitle: "Tester",
//   phone: "000-000000",
//   address: "Earth"
// };

// Identity.create(objIdentity, (err, data) => {
//   if(err) throw err;
//   console.log(data);
// });

// Debugging delete
// let id = 20;
// Identity.destroy(id, (err, data) => {
//   if(err) throw err;
//   console.log(data);
// });