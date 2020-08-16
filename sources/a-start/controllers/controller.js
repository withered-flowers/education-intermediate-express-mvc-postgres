class Controller {
  static getRootHandler(req, res) {
    // Di sini kita akan me-render sebuah views bernama 
    //`views/home.ejs`
    
    // view ini membutuhkan parameter
    //    title, untuk menaruh judul
  }

  static getIdentityRootHandler(req, res) {
    // Di sini kita akan me-render sebuah views bernama
    // views/ide-list.ejs

    // view ini membutuhkan parameter
    //    title, untuk menaruh judul
    //    dataIdentities, untuk menaruh data yang didapat dari model
    //      dalam bentuk tabel
  }
  
  static getIdentityAddHandler(req, res) {
    // Di sini kita akan me-render sebuah views bernama
    // views/ide-add.ejs

    // view ini membutuhkan parameter
    //    title, untuk menaruh judul
  }

  static postIdentityAddHandler(req, res) {
    // Di sini kita akan menerima inputan form dari 
    // views/ide-add.ejs

    // paramater yang diterima adalah
    // req.body.acc_name
    // req.body.acc_jobTitle
    // req.body.acc_phone
    // req.body.acc_address
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
  }
}

module.exports = Controller;