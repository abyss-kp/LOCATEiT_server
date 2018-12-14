/* var EventEmitter = require('events');
const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing


exports.sendMail = function(email, password){
var emitter = new EventEmitter();
console.log("email mailservice ",email)
console.log("pass mailservice",password)
let transporter = nodemailer.createTransport({
    service:'gmail', // true for 465, false for other ports
    auth: {
        user: 'teamlocateit@gmail.com', // generated ethereal user
        pass: "anh3ti1" // generated ethereal password
    }
});

let mailOptions = {
    from: '', // sender address
    to: email, // list of receivers
    subject: 'Thank-You for using <b>LOCATEiT!</b>', // Subject line
    text:'Your password is '
   // html body
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
        emitter.emit('Error' ,error)
    }
    else{
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    emitter.emit('sent' , info);
    }
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});


return emitter
} */