const path = require('path')
const Form = require('../models/Form')
const asyncHandler = require('../middleware/async')
const sendMail = require('../utils/sendMail')
const ErrorResponse = require('../utils/errorResponse')

// @desc     Submit form
// @route    POST/api/form
// @acces    Public
exports.submitForm = asyncHandler( async (req, res, next) => {

    
    console.log(req.files)
    const file = req.files.cv
    console.log(file.name)
    if (!file) {
      return next(new ErrorResponse("Please upload file", 400))
    }

    file.mv(`${process.env.UPLOAD_PATH}/${file.name}`, async err => {
      if(err) {
          return next(
              new ErrorResponse('Problem with file upload', 500))
      } else {
      const form = Form.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      text: req.body.text,
      phone: req.body.phone,
      cv: file.name
    })
  }
  })

    let message = "You have new conact: "

    try {
        await sendMail({
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          message
        });
      res.status(200).json({ success: true, data: 'Form submitted!' });
      } catch (err) {
        return next(new ErrorResponse('Email could not be sent', 500));
      }

});