const nodemailer = require('nodemailer')

const sendEmail = async function (email,password) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.in', // enter your host name
        port: 587,
        secure: false,
        auth: {
            user: 'Enter your email',
            pass: 'Enter your email password',
        }
    });
    await transporter.sendMail({
        from: 'Confirm Email <coderzway@gmail.com>',
        to: email,
        subject: 'Confirm your email',
        html: `<h1>Hello world</h1>`,
    });
}

module.exports = sendEmail;
