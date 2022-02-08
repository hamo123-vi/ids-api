const Form = require('../models/Form')
const asyncHandler = require('../middleware/async')
const sendMail = require('../utils/sendMail')
const ErrorResponse = require('../utils/errorResponse')

// @desc     Submit form
// @route    POST/api/form
// @acces    Public
exports.submitForm = asyncHandler( async (req, res, next) => {

    const form = await Form.create(req.body)

    try {
        await sendMail({
          lastName: req.body.lastName,
          firstName: req.body.firstName,
          email: req.body.email,
          text: req.body.text,
          cv: req.body.cv
        });
      res.status(200).json({ success: true, data: 'Form submitted!' });
      } catch (err) {
        return next(new ErrorResponse('Email could not be sent', 500));
      }

});