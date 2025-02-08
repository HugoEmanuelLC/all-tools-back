import { sendEmailForVerification } from "../scripts/send-emails.js";


let contentEmailForRegisterUser = {
    fromTitle: 'Helc85',
    emailTo: '',
    idUser: null,
    subject: 'Welcome to our app',
    title: 'verify your email',
    message: 'Click on the link below to verify your email',
    urlVerify: 'http://localhost:3001/auth/verify-email-register',
    btnText: 'Verify email'
}


let contentEmailForForgetPassword = {
    fromTitle: 'Helc85',
    emailTo: '',
    idUser: null,
    subject: 'Recover your password',
    title: 'recover your password',
    message: 'Click on the link below to recover your password',
    urlVerify: 'http://localhost:3001/auth/recover-password',
    btnText: 'Recover password'
}


const configEmail = {
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_MAIL_APP_USER,
        pass: process.env.SMTP_MAIL_APP_PASSWORD
    }
}


const valueToken = {
    expiresIn: "1h",
    secretKey: process.env.SECRET_KEY
}


const configSendLink = async (content) => {
    return await new Promise((resolve, reject) => {
        sendEmailForVerification(content, configEmail, valueToken)
        .then(data => {
            resolve(data);
        })
        .catch(error => {
            reject(error);
        })
    });
}


export const sendLinkVerifyEmail = async (req) => {
    contentEmailForRegisterUser.emailTo = req.email;
    contentEmailForRegisterUser.idUser = req.dataDB.id;
    contentEmailForRegisterUser.urlVerify = req.urlToVerify;
    return await new Promise((resolve, reject) => {
        configSendLink(contentEmailForRegisterUser)
        .then(data => {
            resolve(data);
        })
        .catch(error => {
            reject(error);
        })
    });
}


export const sendLinkForgotPassword = (req, res) => {
    contentEmailForForgetPassword.emailTo = req.body.email;
    contentEmailForForgetPassword.idUser = req.body.data.info.id;
    configSendLink(contentEmailForForgetPassword, req, res);
}


