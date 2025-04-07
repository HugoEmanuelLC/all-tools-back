import * as emailScript from "../scripts/send-emails.js";


const contentEmailForForgetPassword = {
    fromTitle: 'Wowmomo',
    emailTo: '',
    idUser: null,
    subject: 'Update your password',
    title: 'Update your password',
    message: 'Click on the link below to update your password',
    urlToVerify: 'http://localhost:3001/auth/recover-password',
    btnText: 'Recover password',
    secretKey: ''
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


// let contentEmailForRegisterUser = {
//     fromTitle: 'Helc85',
//     emailTo: '',
//     idUser: null,
//     subject: 'Welcome to our app',
//     title: 'verify your email',
//     message: 'Click on the link below to verify your email',
//     urlToVerify: 'http://localhost:3001/auth/verify-email-register',
//     btnText: 'Verify email'
// }


/**
 * Send email for verification
 * @param {Object} values.auth.email
 * @param {Object} values.configDB.infosFromDB._id
 * @param {Object} values.auth.urlToVerify
 * @param {Object} values.res.token
 * @returns {Promise} repsonse data
*/ 
export async function sendEmailForVerification (values) {
    contentEmailForForgetPassword.emailTo = values.auth.email;
    contentEmailForForgetPassword.idUser = values.configDB.infosFromDB._id;
    contentEmailForForgetPassword.urlToVerify = values.auth.urlToVerify;
    contentEmailForForgetPassword.secretKey = values.res.token;
    
    return await new Promise((resolve, reject) => {
        emailScript.sendEmailForVerification(contentEmailForForgetPassword, configEmail)
        .then(data => {
            resolve(data);
        })
        .catch(error => {
            console.log("sendEmailForVerification -> error");
            console.log(error);
            reject(error);
            // res.status(error.status).json(error);
        })
    })
}


