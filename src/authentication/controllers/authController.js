import * as authModel from "../models/authModel.js";


export const register = async (req) => {
    return await new Promise((resolve, reject) => {
        authModel.register(req)
        .then(dataAuth => {
            resolve(dataAuth);
        })
        .catch(error => {
            console.log("register -> error");
            reject(error);
        })
    });
};



export const verifyEmail = async (req) => {
    return await new Promise((resolve, reject) => {
        authModel.verifyEmails(req)
        .then(dataAuth => {
            resolve(dataAuth);
        })
        .catch(error => {
            reject(error);
        })
    });
}



export const login = async (req) => {
    return await new Promise((resolve, reject) => {
        authModel.login(req)
        .then(dataAuth => {
            resolve(dataAuth);
        })
        .catch(error => {
            reject(error);
        })
    });
}



export const testVerifyAuth = (req, res) => authModel.verifyAuth(req, res);
export const sendLinkForgotPassword = (req, res) => authModel.sendLinkForgotPassword(req, res);
export const sendRecoverPassword = (req, res) => authModel.sendRecoverPassword(req, res);
export const sendNewPassword = (req, res) => authModel.sendNewPassword(req, res);