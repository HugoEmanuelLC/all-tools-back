import * as sendEmailModel from '../models/emailModel.js';


export const sendEmailForVerification = async (req, res, next) => {

    await sendEmailModel.sendEmailForVerification(req.body)
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        next()
    })
    .catch(error => {
        console.log("sendEmailForVerification -> error");
        console.log(error);
        res.status(error.status).json(error)
    }) 
};
// export const sendLinkVerifyEmail = sendEmailModel.sendLinkVerifyEmail ;