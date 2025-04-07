// Dependances
import nodemailer from "nodemailer";


export function sendEmailForVerification(
    contentEmail = {
        fromTitle: "",
        emailTo: "",
        idUser: "",
        subject: "",
        title: "",
        message: "",
        urlToVerify: "",
        btnText: "",
        secretKey: ""
    }, 
    configEmail = {}
){
    return new Promise((resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport(configEmail);

            // message object
            let message = {
                from: `${contentEmail.fromTitle ? contentEmail.fromTitle : "Web Platform"} ${configEmail.auth.user}`,
                to: contentEmail.emailTo,
                subject: contentEmail.subject,
                html: `<h1>${contentEmail.title}</h1>
                <p>${contentEmail.message}</p>
                <a href="${contentEmail.urlToVerify}?secret=${contentEmail.secretKey}">${contentEmail.btnText}: ${contentEmail.urlToVerify}?secret=${contentEmail.secretKey}</a>`
            }

            // send email
            transporter.sendMail(message, (err, info) => {
                if (err) {

                    console.log("ERROR -------------------------");
                    console.log(err);
                    console.log("ERROR -------------------------");

                    reject({status: 500, message: 'email error occurred, check your content email'});
                } else {
                    resolve({status: 201, message: 'email sent to '+info.accepted});
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