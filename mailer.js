const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "thanubhats60@gmail.com",
    pass: "hljs tktk jcgl jqdk"
  }
});

function sendVerificationEmail(email, token) {
  const link = `http://localhost:3000/verify/${token}`;

  const mailOptions = {
    from: 'thanubhats60@gmail.com',
    to: email,
    subject: 'Verify your email',
    html: `
      <h1>Verify your account</h1>
      <a href="${link}">Verify</a>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
}

module.exports = sendVerificationEmail;
