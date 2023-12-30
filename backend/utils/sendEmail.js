const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOpations = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOpations);
};

const reviceEmail = async (options) => {
  //   console.log(options);
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOpations = {
    from: options.email,
    to: process.env.SMTP_MAIL,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOpations);
};

module.exports = sendEmail;
module.exports = reviceEmail;
