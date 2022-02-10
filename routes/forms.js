const express = require('express');
const multer = require('multer')
const router = express.Router();
const { 
        submitForm
      } = require('../controllers/forms');


// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })

router.route('/').post(submitForm, upload.single("cv"))

module.exports = router