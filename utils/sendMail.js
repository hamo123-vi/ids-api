const nodemailer = require('nodemailer');

const sendMail = async(options) => {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let message = {
    from: `${options.email}`,
    to: process.env.MAIL_TO,
    subject: process.env.SUBJECT,
    text: options.text,
    cv: options.cv
  };

  const info = await transporter.sendMail(message);

  console.log("Message sent, id %s",info.messageId)
}

module.exports = sendMail;