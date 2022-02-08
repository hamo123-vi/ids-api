const express = require('express');
const router = express.Router();
const { 
        submitForm
      } = require('../controllers/forms');

router.route('/').post(submitForm)

module.exports = router