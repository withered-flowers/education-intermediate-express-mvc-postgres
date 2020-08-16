## Table of Content
1. [Recap MVC](#recap-mvc)
1. [Recap Express](#recap-express)
1. [Recap Sequelize](#recap-sequelize)
1. [Let's Make the App](#lets-make-the-app)
1. [References](#references)

## Recap MVC
Hayo, masih ingat kan dengan MVC?  
- `(M)odel` - Logic Desain yang berhubungan dengan data dan representasinya
- `(V)iew` - Logic Desain yang berhubungan dengan output / User Interface
- `(C)ontroller` - Logic Desain yang berfungsi sebagai otak / *processor* yang
  berfungsi untuk menerima input dari user dan mengirimkan ke Model dan View.

## Recap Express
Express merupakan framework minimal untuk pembuatan web pada nodejs yang sangat 
populer. Dengan menggunakan express ini kita bisa membuat REST API dengan 
sangat cepat ataupun kita bisa membuat aplikasi web Server Side Rendering 
dengan menggunakan template engine tertentu, seperti *pug*, *ejs*, dan lain 
lain.

## Recap Postgres
Postgres merupakan database yang akan digunakan untuk menyimpan data kita pada
pembelajaran kali ini, dengan menggunakan module tambahan pada nodejs bernama
[`pg`](https://https://node-postgres.com/), kita akan menggunakan data yang
diolah dari postgres ini.

Pada pembelajaran kali ini kita akan membuat sebuah aplikasi yang akan 
menggunakan:
* `express` sebagai web framework kita.
* `ejs` sebagai templating engine tampilan.
* `postgres` sebagai database SQL penampung data.

## Let's Make the App
Sudah cukup teorinya bukan?

Sekarang mari kita mencoba untuk membuat aplikasinya !

Disclaimer:
- Pada pembelajaran kali ini tidak akan didemokan full dari requirement yang
  ada di bawah ini
- Pada pembelajaran kali ini sudah diberikan beberapa template, terutama untuk
  bagian user interfacenya
- Pada pembelajaran kali ini, tidak ditekankan terlalu dalam mengenai OOP-nya.

Requirement dari aplikasi ini adalah:
* Diberikan sebuah database pada `postgresql` dengan nama `development`
* Dengan diberikan sebuah data `data/dummy.json`, buatlah sebuah tabel dengan 
  nama `Identities` pada database yang dibuat.
* Tabel `Identities` akan memiliki kolom yang dapat dilihat pada 
  [Tabel 1](#tabel-1)

* Buatlah sebuah aplikasi web sederhana yang akan memiliki endpoint yang dapat
  dilihat pada [Tabel 2](#tabel-2)

#### Tabel 1

| Kolom    | Tipe         | Deskripsi   |
|:---------|:-------------|:------------|
| id       | SERIAL       | PRIMARY KEY |
| name     | VARCHAR(255) | NOT NULL    |
| jobTitle | VARCHAR(255) | NOT NULL    |
| phone    | VARCHAR(255) | NOT NULL    |
| address  | VARCHAR(255) | NOT NULL    |

#### Tabel 2

| Endpoint           | Deskripsi                              |
|:-------------------|:---------------------------------------|
| GET /              | Menampilkan "hello world"              |
| GET /ide           | Menampilkan form penambah `Identities` |
| GET /ide/add       | Menampilkan form penambah `Identities` |
| POST /ide/add      | Menghandle form penambah `Identities`  |
| GET /ide/edit/:id  | Menampilkan edit form `Identities`     |
| POST /ide/edit/:id | Menghandle edit form `Identities`      |
| GET /ide/del/:id   | Menghandle delete `Identities`         |

Jadi setelah melihat requirement seperti, apa sajakah yang harus kita lakukan?

### Langkah 1 - Inisialisasi & Install module yang dibutuhkan terlebih dahulu
Pertama-tama kita harus menginisialisasi folder dan module yang dibutuhkan
dengan cara:
* Melakukan `npm init -y`
* Menginstall module yang dibutuhkan `express`, `ejs`, dan `pg`
  dengan `npm install express ejs pg`
* Menginstall module yang dibutuhkan pada saat `development` yaitu `nodemon`
  dengan `npm install -D nodemon`

Maka setelah ini bentuk foldernya akan menjadi seperti ini:
```
.
├── data
│   └── dummy.json
├── node_modules
│   └── ...
├── package.json
└── package-lock.json
```

### Langkah 2 - Inisialisasi dan Postgres
Selanjutnya setelah kita melakukan inisialisasi dan konfigurasi `postgres` 
dengan cara:
* Dengan menggunakan Client Tools Postgres yang kita ketahui (`pgadmin` / 
  `postico` / `dbeaver` / `adminer` / `psql` / ...), buatlah sebuah database 
  pada postgres dengan nama `development`
* Membuat sebuah folder baru dengan nama `config`
* Membuat sebuah file baru dengan nama `config.js`
* Mmebuat code untuk `config.js`, pada pembelajaran kali ini kita akan 
  menggunakan `pg` **Pool**, bukan **Client**, sehingga ada beberapa opsi 
  tambahan yang harus kita gunakan, dapat dilihat pada Code di bawah ini.

#### Code 00
```javascript
// File: config/config.js

const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  database: 'development',
  // Maksimum client yang dialokasikan
  max: 20,
  // Waktu untuk timeout ketika pg dalam kondisi idle
  idleTimeoutMillis: 10000,
  // Waktu untuk timeout ketika pg dalam waktu terkoneksi yang cukup lamaß
  connectionTimeoutMillis: 2000,
});

module.exports = pool;
```

### Langkah 3 - Membuat tabel Identities
Selanjutnya adalah kita akan membuat tabel `Identities` dengan menggunakan
`postgres`. Caranya adalah dengan: 
* (OPTIONAL) Membuat folder dengan nama `migrations` yang akan menyimpan semua 
  hal yang berhubungan dengan pembuatan tabel.
* Membuat file dengan nama `setup.js` pada folder tersebut.
* Menulis code untuk membuat tabel `Identities` sesuai dengan kode yang
  diberikan di bawah

#### Code 01
```javascript
// File: setup.js

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
```
* Jalankan kode yang sudah ditulis dengan menggunakan `node migrations/setup.js`
* Cek kembali pada Client Tools, apakah Tabel `Identities` sudah berhasil 
  terbentuk?

### Langkah 4 - Membuat seeder
Selanjutnya, setelah tabel terbentuk, kita akan memasukkan data yang kita
miliki dalam `data/dummy.json` menjadi data dalam tabel kita, oleh karena itu
langkah-langkahnya adalah:
* Membuat folder dengan nama `seeders`
* Membuat file dengan nama `seed.js`
* Menulis code untuk mempopulasikan data dari `dummy.json` menjadi data dalam
  tabel `Identities`, contoh code dapat dilihat di bawah

### Code 02
```javascript
// File: seeders/seed.js

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
```

* Jalankan code yang sudah diketikkan ini dengan menggunakan 
  `node seeders/seed.js`
* Lihatlah apakah kode berjalan dengan baik? apabila iya, coba lihat pada 
  Client tools, apakah data sudah masuk?

### Langkah 5 - Membuat app.js, routes, dan Controller (Partial)
Sebelumnya, kita akan membuat sebuah folder bernama `controllers` terlebih
dahulu dan membuat sebuah file `controllers/controller.js` yang masih kosong.

Selanjutnya kita akan membuat `app.js` beserta routesnya terlebih dahulu.

Pada file `app.js` kita akan menuliskan kode untuk:
* Menjalankan express
* Menggunakan view engine ejs
* Menggunakan body-parser / express.urlencoded
* Membuat router express mengarah ke `routes/index.js`

Sehingga pada file `app.js`, akan terbentuk kode sebagai berikut
```javascript
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
```

Selanjutnya kita akan mendefinisikan routes dan seluruh endpoint yang ada, 
hal ini akan kita definisikan dalam 2 file, yaitu:
* `routes/identities.js` yang berisi semua yang berhubungan dengan resource
  `ide/` dan
* `routes/index.js` yang berisi penampung semuanya.

Berdasarkan penjelasan di atas, maka selanjutnya adalah kita akan:
* Membuat folder `routes`
* Membuat file `routes/identities.js`
* Membuat file `routes/index.js`

Maka pada file `routes/identities.js`, kita juga akan mendefinisikan beberapa
method yang dibutuhkan sebagai method `Controller` untuk setiap endpoint yang
ada.

```javascript
const express = require('express');
const router = express.Router();

const Controller = require('../controllers/controller.js');

// Semua router endpoint yang ada hub dengan /ide
// ditaruh di sini
router.get('/', Controller.getIdentityRootHandler);
router.get('/add', Controller.getIdentityAddHandler);
router.post('/add', Controller.postIdentityAddHandler);
router.get('/edit/:id', Controller.getIdentityEditHandler);
router.post('/edit/:id', Controller.postIdentityEditHandler);
router.get('/del/:id', Controller.getIdentityDelHandler);

module.exports = router;
```

Dicatat bahwa pada `routes/identities.js` ini akan memangil file 
`controllers/controller.js` dan memiliki 6 method yang harus didefiniskan 
nanti:
* getIdentityRootHandler
* getIdentityAddHandler
* postIdentityAddHandler
* getIdentityEditHandler
* postIdentityEditHandler
* getIdentityDelHandler

Selanjutnya kita akan berpindah pada file `routes/index.js` dan mendefinisikan
seluruh rute utama yang harus ada.

Kode untuk `routes/index.js` adalah sebagai berikut:
```javascript
const express = require('express');
const router = express.Router();

const Controller = require('../controllers/controller.js');
const identityRoutes = require('./identities.js');

// Semua route akan dihandle oleh si index ini
router.get('/', Controller.getRootHandler);
router.use('/ide', identityRoutes);

module.exports = router;
```

Dicatat lagi bahwa pada `routes/index.js` ini akan memanggil file 
`controllers/controller.js` dan memiliki 1 method tambahan yang harus 
didefiniskan nanti:
* getRootHandler

Sehingga total akan ada 7 method yang harus didefine pada 
`controllers/controller.js`.

Setelah semua rute didefinisikan dan `app.js` selesai dibuat, maka saatnya 
kita berpindah ke bagian `otak` nya, yaitu `controllers.controller.js` dan
mendefinisikan ke-7-method yang dibuat.

WARNING:  
Untuk mempercepat proses pembelajaran, maka untuk `views` nya sudah 
disediakan template dan sudah disebutkan variabel apa yang dibutuhkan.
Diingat pada dunia nyata `views` ini harus dibuat sendiri yah !

### Langkah 6 - Membuat Model Identity

Selanjutnya, sebelum kita mengunjungi Controller, ada baiknya kita sekarang
akan membuat model dari `Identity` terlebih dahulu.

Maka selanjutnya kita akan:
* Membuat folder `models`
* Membuat file `identity.js`

Pada file `identity.js` kita akan menuliskan representasi data dalam aplikasi,
menuliskan method yang akan berfungsi untuk mengkoneksikan logic aplikasi kita
dan memodifikasi data pada postgres.

Penulisan codenya adalah sebagai berikut:
```javascript
// File: models/identity.js

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
```

### Langkah 7 - Revisiting Controller

Setelah selesai membuat model `Identity`, saat nya kita menggabungkan semuanya
dalam controller yang akan kita gunakan !

```javascript
const Identity = require('../models/identity');

class Controller {
  static getRootHandler(req, res) {
    // Di sini kita akan me-render sebuah views bernama 
    //`views/home.ejs`
    
    // view ini membutuhkan parameter
    //    title, untuk menaruh judul
    res.render('home', {
      title: "Home"
    });
  }

  static getIdentityRootHandler(req, res) {
    // Di sini kita akan me-render sebuah views bernama
    // views/ide-list.ejs

    // view ini membutuhkan parameter
    //    title, untuk menaruh judul
    //    dataIdentities, untuk menaruh data yang didapat dari model
    //      dalam bentuk tabel
    Identity.findAll((err, data) => {
      if(err) {
        res.send(err);
      }
      else {
        res.render('ide-list.ejs', {
          title: "Identity - List",
          dataIdentities: data
        });
      }
    })
  }
  
  static getIdentityAddHandler(req, res) {
    // Di sini kita akan me-render sebuah views bernama
    // views/ide-add.ejs

    // view ini membutuhkan parameter
    //    title, untuk menaruh judul
    res.render('ide-add', {
      title: "Identity - Add"
    });
  }

  static postIdentityAddHandler(req, res) {
    // Di sini kita akan menerima inputan form dari 
    // views/ide-add.ejs

    // paramater yang diterima adalah
    // req.body.acc_name
    // req.body.acc_jobTitle
    // req.body.acc_phone
    // req.body.acc_address
    let objIdentity = {
      name: req.body.acc_name,
      jobTitle: req.body.acc_jobTitle,
      phone: req.body.acc_phone,
      address: req.body.acc_address
    };

    Identity.create(objIdentity, (err, data) => {
      if(err) {
        res.send(err);
      }
      else {
        res.redirect('/ide');
      }
    });
  }

  static getIdentityEditHandler(req, res) {
    // Di sini kita akan menerima inputan dari 
    // parameter di endpoint dan 
    // Kemudian akan melakukan pencarian spesifik dari tabel
    // dan melemparkannya ke views/ide-edit.ejs

    // view ini membutuhkan parameter
    //    title, untuk menaruh judul
    //    dataIdentity, untuk menerima data identitas dari 
    //      hasil pencarian
  }

  static postIdentityEditHandler(req, res) {
    // Di sini kita akan menerima inputan dari 
    // parameter di endpoint dan 
    // form dari views/ide-edit.ejs

    // paramater yang diterima adalah
    // req.body.acc_name
    // req.body.acc_jobTitle
    // req.body.acc_phone
    // req.body.acc_address
  }

  static getIdentityDelHandler(req, res) {
    // Di sini kita akan menerima inputan dari 
    // parameter di endpoint
    let id = Number(req.params.id);

    Identity.destroy(id, (err, data) => {
      if(err) {
        res.send(err)
      }
      else {
        res.redirect('/ide');
      }
    });
  }
}

module.exports = Controller;
```

Sampai di tahap ini, artinya aplikasi kita sudah selesai dan siap dijalankan.

### Langkah 8 - Jalankan Aplikasi
Mari kita jalankan aplikasi kita dengan mengetik `npx nodemon app.js`

Selamat ! sampai di sini artinya kita sudah berhasil membuat aplikasi dengan
menggunakan express dan sequelize dan sudah berhasil melakukan CRUD sederhana !

(Psstt... untuk update memang sengaja pada model tidak dituliskan sebagai bahan
pembelajaran mandiri yah !)

## References
* [pg Pool references](https://node-postgres.com/api/pool)
