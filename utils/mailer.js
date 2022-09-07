const nodeMailer = require('nodemailer')
const ADMIN_EMAIL = 'aloha.money.codegym@gmail.com'
const ADMIN_PASSWORD = 'ddtjbgzxqokphzwi'
const mailHost = 'smtp.gmail.com'
const mailPort = 587

const sendMail = (to, subject, htmlContent) => {
    const transporter = nodeMailer.createTransport({
        host: mailHost,
        port: mailPort,
        secure: false,
        auth: {
            user: 'aloha.money.codegym@gmail.com',
            pass: 'ddtjbgzxqokphzwi'
        }
    })

    const options = {
        from: process.env.ADMIN_EMAIL,
        to: to,
        subject: subject,
        html: htmlContent
    }

    return transporter.sendMail(options)
}

module.exports = {
    sendMail: sendMail
}