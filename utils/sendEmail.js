const nodemailer = require('nodemailer')

const sendEmail = async(options) => {
  //1) Create transporter what service will use like ("email" or "mailgun" ,"mailtrap")
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.email",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "karimsaad948@gmail.com",
      pass: "jn7jnAPss4f63QBp6D",
    },
  });

    //2) Dfine email options (like from,to,subject,text)
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to:options.email,
      subject:options.subject, // Subject line
      text:options.message
     
    });
  
  }
  
;

module.exports = sendEmail;
