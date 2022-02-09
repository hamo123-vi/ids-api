const nodemailer = require('nodemailer');

const sendMail = async(options) => {

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'flavie.bernier66@ethereal.email',
        pass: 'XMrsQZVEtgM3q99khf'
    }
});

  // send mail with defined transport object
  let message = {
    from: "valjevac.amil@gmail.com",
    to: "amil.valjevac@stu.ibu.edu.ba",
    subject: process.env.SUBJECT
  };

  const info = await transporter.sendMail(message);

  console.log("Message sent, id %s",info.messageId)
}

module.exports = sendMail;