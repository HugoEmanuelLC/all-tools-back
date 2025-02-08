import * as sendEmail from '../models/emailModel.js';


export const sendLinkVerifyEmail = sendEmail.sendLinkVerifyEmail ;
export const sendLinkForgotPassword = (req, res) => sendEmail.sendEmailForVerification(req, res);