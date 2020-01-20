const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

const sendMail = (msg) => {
  if (process.env.NODE_ENV === 'production' && process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    return sgMail.send(msg);
  }

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  return transporter.sendMail(msg);
};

const makeANiceEmail = (text) => `
  <div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <h2>Hello There!</h2>
    <p>${text}</p>

    <p>😘 Margarida</p>
  </div>
`;


exports.sendMail = sendMail;
exports.makeANiceEmail = makeANiceEmail;
