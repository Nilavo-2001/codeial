const nodeMailer = require("../config/nodemailer");

// this is another way of exporting a method
exports.newComment = (comment) => {
  //   console.log("inside newComment mailer", comment);
  let htmlTemplate = nodeMailer.renderTemplate(
    { comment: comment },
    "/comments/new_comment.ejs"
  );
  nodeMailer.transporter.sendMail(
    {
      from: "habraking2001@gmail.com",
      to: comment.user.email,
      subject: "New Comment Published!",
      html: htmlTemplate,
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
