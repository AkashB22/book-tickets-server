let nodemailer = require('nodemailer');
let lib = {};

lib.sendMail = function(to, subject, text, cb){
    let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

const mailOption = {
    from: 'booktickets <booktickets@gmail.com>',
    to: to,
    subject: subject,
    html: text
}
transport.sendMail(mailOption, (err, response)=>{
    if(err) throw err;
    else cb(err, response);
});
}

module.exports = lib;
