const nodemailer = require('nodemailer');

const sendMail = async(options) => {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASSWORD
    },
  });

  // send mail with defined transport object
  let message = {
    from: 'Contact notification <doNotReply@id-s.ba>',
    to: process.env.MAIL_TO,
    subject: process.env.SUBJECT,
    name: `${options.firstName} ${options.lastName}`,
    text: `${options.message} ${options.firstName} ${options.lastName}`
  };

  const info = await transporter.sendMail(message);

  console.log("Message sent, id %s",info.messageId)
}

module.exports = sendMail;