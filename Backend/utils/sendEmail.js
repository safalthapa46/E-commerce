const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false,
service:'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});


 async function sendMail(mailOptions) {
  
  const info = await transporter.sendMail({
    from: "thapasafal46@gmail.com", 
    to: mailOptions.userEmail, 
    subject: mailOptions.subject, 
    text: mailOptions.text,
    html: mailOptions.html, 
  });

  console.log("Message sent: %s", info.messageId);
}

// main().catch(console.error);
module.exports= sendMail