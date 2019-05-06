// ! Node Mailer for sending mails to required users from our ADMIN mail id
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'sellmobileteam@gmail.com',
    pass: 'Meanstack@2019'
  }
});

module.exports = {
  transporter: transporter
};