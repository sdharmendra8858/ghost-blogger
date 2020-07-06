const sgMail = require('@sendgrid/mail');

const sendgridAPIkey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendgridAPIkey);

const sendWelcomeMail = async (email, name) => {
    await sgMail.send({
        to: email,
        from: 'sdharmendra8858@gmail.com',
        subject: 'Welcome to be a part of us.',
        text: `Welcome ${name}, We welcome you and are esteemed to work with you.`
    })
}

const sendRemoveMail = async (email, name) => {
    await sgMail.send({
        to: email,
        from: 'admin@blog.in',
        subject: 'Sorry to see you go!',
        text: `Goodbye ${name}, I hope to see you sometime soon`,
        html: '<strong> See you soon! </strong>'
    })
}

module.exports = {sendWelcomeMail, sendRemoveMail};