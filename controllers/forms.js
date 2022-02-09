const path = require('path')
const Form = require('../models/Form')
const asyncHandler = require('../middleware/async')
const sendMail = require('../utils/sendMail')
const ErrorResponse = require('../utils/errorResponse')

// @desc     Submit form
// @route    POST/api/form
// @acces    Public
exports.submitForm = asyncHandler( async (req, res, next) => {

    if(req.files) {
      const file = req.files.file;
      file.name = `${req.body.firstName} ${req.body.firstName} ${path.parse(file.name).ext}`
      file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if(err) {
            return next(
                new ErrorResponse('Problem with file upload', 500)
            )
        }
    })
  }

    const form = await Form.create({
      
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