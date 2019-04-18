
"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
module.exports = async function main(name, email, message){

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
       }
   });

   let mailOptions = {
    from: email, // sender address
    to: "marija@mkhost.com.mk, kosta@mkhost.com.mk", // list of receivers
    subject: "Contact from " + name, // Subject line
    text: message // plain text body
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
        return false;
    }
  });
}