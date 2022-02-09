const Form = require('../models/Form')
const asyncHandler = require('../middleware/async')
const sendMail = require('../utils/sendMail')
const ErrorResponse = require('../utils/errorResponse')

// @desc     Submit form
// @route    POST/api/form
// @acces    Public
exports.submitForm = asyncHandler( async (req, res, next) => {

    const form = await Form.create(req.body)

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