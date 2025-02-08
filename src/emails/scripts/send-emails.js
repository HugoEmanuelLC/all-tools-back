// Dependances
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";


function createToken(params = { id, secretKey, expiresIn: '1h' }) {
    return jwt.sign({ id: params.id }, params.secretKey, { expiresIn: params.expiresIn });
}


export function sendEmailForVerification(
    contentEmail = {
        fromTitle: "",
        emailTo: "",
        idUser: "",
        subject: "",
        title: "",
        message: "",
        urlVerify: "",
        btnText: ""
    }, 
    configEmail = {},
    valueToken = {
        expiresIn: "1h",
        secretKey: ""
    }
){
    return new Promise((resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport(configEmail);
            // secret key
            let secret = createToken({
                id: contentEmail.id, 
                secretKey: valueToken.secretKey, 
                expiresIn: valueToken.expiresIn
            });

            // message object
            let message = {
                from: `${contentEmail.fromTitle ? contentEmail.fromTitle : "Web Platform"} ${configEmail.auth.user}`,
                to: contentEmail.emailTo,
                subject: contentEmail.subject,
                html: `<h1>${contentEmail.title}</h1>
                <p>${contentEmail.message}</p>
                <a href="${contentEmail.urlVerify}?secret=${secret}">${contentEmail.btnText}: ${contentEmail.urlVerify}?secret=${secret}</a>`
            }
            transporter.sendMail(message, (err, info) => {
                if (err) {
                    reject({status: 500, message: 'email error occurred', info: err, messageSent: message});
                } else {
                    resolve({status: 201, message: 'email sent', info: {accepted: info.accepted}, messageSent: message});
                }
            });
            
        } catch (error) {
            console.log('Email error occurred: ' );
            reject({
                status: 500, 
                message: Object.keys(configEmail).length == 0 ? 
                    'Email not send because configuration email is empty' : 
                    'Email error occurred, check your configuration email', 
                info: error
            });
        }
    });
}