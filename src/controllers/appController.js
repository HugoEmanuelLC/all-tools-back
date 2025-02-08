import * as authController from '../authentication/controllers/authController.js';
import * as emailController from '../emails/controllers/emailController.js';





export const register = async (req, res) => {
    return await authController.register(req)
    .then(dataAuth => {
        
        let reqBody = { 
            email: req.body.email, 
            urlToVerify: req.body.urlToVerify,
            dataDB: {
                id: dataAuth.info.insertId,
            } 
        }

        emailController.sendLinkVerifyEmail(reqBody)
        .then(dataEmail => {
            res.status(200).json({
                status: 201,
                message: "User registered successfully and email sent",
                DB: dataAuth,
                Email: dataEmail
            });
        })
        .catch(error => {
            console.log("error 2 ------------");
            res.status(error.status).json(error);
        })
    })
    .catch(error => {
        console.log("error 1 ------------");
        res.status(400).json(error)
    });
}



export const verifyEmail = async (req, res) => {
    return await authController.verifyEmail(req.body)
    .then(dataAuth => {
        console.log("dataAuth");
        console.log(dataAuth);
        res.status(200).json({
            status: 200,
            message: "Email verified successfully",
            DB: dataAuth
        });
    })
    .catch(error => {
        console.log("error 1 ------------");
        console.log(error);
        res.status(400).json(error)
    });
}



export const login = async (req, res) => {
    return await authController.login(req.body, res)
    .then(dataAuth => {
        res.status(200).json({
            status: 200,
            message: "User logged in successfully",
            DB: dataAuth
        });
    })
    .catch(error => {
        res.status(400).json(error)
    });
}