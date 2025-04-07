// import * as authModel from "../models/authModel.js";
import {} from "dotenv/config";
// Scripts
import * as script from "../scripts/script.js";



export const isValidEmail = async (req, res, next) => {
    // console.log("isValidEmail -> req.body.auth.email", req.body);
    try {
        await script.isValidEmail(req, req.body.auth.email)
        .then(data => {
            req.body.res.status = data.status
            req.body.res.message = data.message
            next()
        })
        .catch(error => {
            console.log("isValidEmail -> error");
            console.log(error);
            res.status(error.status).json(error)
        }) 
    } catch (error) {
        console.log("isValidEmail -> error");
        console.log(error);
        res.status(500).json({ status: 500, message: "server problem, impossible to select" })
    }
};



export const isValidPassword = async (req, res, next) => {
    if (req.body.auth.password.length < 8) {
        req.body.res.status = 400
        req.body.res.message = "The password must be at least 8 characters"
        res.status(400).json({
            status: 400,
            message: "The password must be at least 8 characters"
        })
        
    } else {
        let values = {
            postPassword: req.body.auth.password,
            dbPassword: req.body.configDB.infosFromDB.password,
        }
    
        await script.decryptPassword(values)
        .then(data => {
            req.body.res.status = data.status
            req.body.res.message = data.message
            next()
        })
        .catch(error => {
            console.log("isValidPassword -> error");
            console.log(error);
            res.status(error.status).json(error)
        }) 
    }
}



export const createToken = async (req, res, next) => {
    let values = {
        id: req.body.configDB.infosFromDB._id,
        secretKey: req.body.configToken.secretKey !== null ? req.body.configToken.secretKey : process.env.SECRET_TOKEN_KEY,
        expiresIn: req.body.configToken.expiresIn !== null ? req.body.configToken.expiresIn : "24h"
    }
    let token = script.createToken(req, values)
    
    req.body.res.token = token
    next()
}



export const isValidToken = async (req, res, next) => {
    return await script.isValidToken(
        req,
        req.headers.authorization,
        req.body.configToken.secretKey !== null ? req.body.configToken.secretKey : process.env.SECRET_TOKEN_KEY,
        {
            correct: "the token is valid",
            notCorrect: "the token is invalid"
        }
    )
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        next()
    })
    .catch(error => {
        console.log("isValidToken -> error");
        console.log(error);
        res.status(error.status).json(error)
    })
}



export const hashPassword = async (req, res, next) => {
    if (req.body.auth.password.length < 8) {
        // req.body.res.status = 400
        // req.body.res.message = "The password must be at least 8 characters"
        res.status(400).json({
            status: 400,
            message: "The password must be at least 8 characters"
        })
    } else {
        await script.hashPassword(req, req.body.auth.password)
        .then(data => {
            req.body.auth.password = data.password
            next()
        })
        .catch(error => {
            console.log("hashPassword -> error");
            console.log(error);
            res.status(error.status).json(error)
        }) 
    }
}



// export const testVerifyAuth = (req, res) => authModel.verifyAuth(req, res);
// export const sendLinkForgotPassword = (req, res) => authModel.sendLinkForgotPassword(req, res);
// export const sendRecoverPassword = (req, res) => authModel.sendRecoverPassword(req, res);
// export const sendNewPassword = (req, res) => authModel.sendNewPassword(req, res);