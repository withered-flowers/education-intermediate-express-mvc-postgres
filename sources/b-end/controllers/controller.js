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