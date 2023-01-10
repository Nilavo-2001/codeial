const mailer = require("../config/nodemailer");
module.exports.newPassword = (email, acessToken) => {
  console.log(email, acessToken);
  mailer.transporter.sendMail(
    {
      from: "habraking2001@gmail.com",
      to: email,
      subject: "Reset Password Link",
      html: `<h1> <a href="http://localhost:8000/forgot-password/set-password/${acessToken}" > Reset Password </a> </h1>`,
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }

      console.log("Message sent", info);
      return;
    }
  );
};
