// Dependencies
import {} from "dotenv/config";
//  Connection
import connection from "../../dbConfigs/mysql.js";
// Scripts
import { 
    userRegister, 
    userLogin,
    verifySecretLinkAndToken,
    forgotPassword,
    resetPassword
} from "../scripts/main.js";



export const register = async (req) => {
    // req.body.email = "hugoclavinas@gmail.com";
    // req.body.password = "testest";
    
    const userInfos = req.body;
    
    userInfos.email = userInfos.email.trim();
    userInfos.email = userInfos.email.toLowerCase();

    return await new Promise((resolve, reject) => {
        if (userInfos.password.length < 6) {
            return reject({status: 400, message: "password must be at least 6 characters", info: null});
            
        }
        userRegister(
            req.body,
            {
                connection,
    
                valueTable: {
                    tableAuthName:"auth",
                    colonneEmailName: "email",
                    colonneIdName: "_id",
                }
            }
        )
        .then((data) => {
            resolve(data);
        })
        .catch(error => {
            reject(error);
        })
    });
}




export const login = async (req, res) => {
    // req.body.email = "hugoclavinas@gmail.com";
    // req.body.password = "test";
    const userInfos = req;
    // userInfos.password = userInfos.password.trim();
    // userInfos.password = userInfos.password.toLowerCase();
    userInfos.email = userInfos.email.trim();
    userInfos.email = userInfos.email.toLowerCase();
    // console.log(userInfos);
    // console.log(Object.keys(userInfos).length);

    return await new Promise((resolve, reject) => {
        Object.keys(userInfos).length != 0 ?
            userLogin(
                userInfos,
                {
                    connection,

                    valueTable: {
                        tableAuthName:"auth",
                        colonneEmailName: "email",
                        colonnePasswordName: "password",
                        colonneIdName: "_id",
                    },
                    
                    valueToken: {
                        expiresIn: "24h",
                        secretKey: process.env.SECRET_TOKEN_KEY
                    }
                }
            )
            .then(data => {
                // console.log("data -> ", data);
                // res.status(data.status).json({
                //     status: data.status,
                //     message: data.message,
                //     token: data.token,
                // });

                resolve(data);
            })
            .catch(error => {
                // console.log("userLogin error -> ", error);
                // res.status(error.status).json(error);
                reject(error);
            }) 
        // : res.status(500).json({message: "The server did not receive any data", info: {}});
        : reject({status: 500, message: "The server did not receive any data", info: {}});
    });
};


export const verifyEmails = async (req) => {
    console.log(req);
    return await new Promise((resolve, reject) => {
        verifySecretLinkAndToken(req.token, process.env.SECRET_KEY, false)
        .then(data => {
            // res.status(data?.status).json(data);
            resolve(data);
        })
        .catch(error => {
            // res.status(error?.status).json(error);
            reject(error);
        })
    });
}



export const verifyAuth = (req, res) => {
    // let token = req.headers.authorization;
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDU3LCJpYXQiOjE3MzIyMTg3MDgsImV4cCI6MTczMjMwNTEwOH0.2AevvlU8YAo_NaHy6zqXP9vSGCNHUN6pmnIkLUOBcCE";
    verifySecretLinkAndToken(token, process.env.SECRET_TOKEN_KEY, true)
    .then(data => {
        res.status(data.status).json(data);
    })
    .catch(error => {
        res.status(error.status).json(error);
    })
}



export const sendLinkForgotPassword = (req, res) => {
    req.body.email = "helc85.info@gmail.com";
    // req.body.password = "hugohugo";

    forgotPassword(
        req.body, 
        {
            connection,
            valueTable: {
                tableAuthName:"auth",
                colonneEmailName: "email",
                colonneIdName: "_id",
            },

            contentEmail: {
                urlVerify: 'http://localhost:3001/auth/recover-password',
                fromTitle: 'Helc85',
                subject: 'Recover your password',
                title: 'recover your password',
                message: 'Click on the link below to recover your password',
                btnText: 'Recover password'
            },

            configEmail: {
                service: process.env.SMTP_SERVICE,
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                auth: {
                    user: process.env.SMTP_MAIL_APP_USER,
                    pass: process.env.SMTP_MAIL_APP_PASSWORD
                }
            },

            valueToken: {
                expiresIn: "1h",
                secretKey: process.env.SECRET_KEY
            }
        }
    )
    .then(data => {
        res.status(data.status).json(data);
    })
    .catch(error => {
        res.status(error.status).json(error);
    })
}



export const sendRecoverPassword = (req, res) => {
    verifySecretLinkAndToken(req.query.secret, process.env.SECRET_KEY, false)
    .then(data => {
        res.status(data.status).json(data);
    })
    .catch(error => {
        res.status(error.status).json(error);
    })
}


export const sendNewPassword = (req, res) => {
    req.body.email = "helc85.info@gmail.com";
    req.body.password = "hugo";

    resetPassword(
        req.body, 
        {
            connection,
            valueTable: {
                tableAuthName:"auth",
                colonneEmailName: "email",
                colonnePasswordName: "password",
                colonneIdName: "_id",
            },

            contentEmail: {
                urlVerify: 'http://localhost:3001/auth/recover-password',
                fromTitle: 'Helc85',
                subject: 'Recover your password',
                title: 'recover your password',
                message: 'password changed',
                btnText: 'Recover password'
            },

            configEmail: {
                service: process.env.SMTP_SERVICE,
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                auth: {
                    user: process.env.SMTP_MAIL_APP_USER,
                    pass: process.env.SMTP_MAIL_APP_PASSWORD
                }
            },

            valueToken: {
                expiresIn: "24h",
                secretKey: process.env.SECRET_KEY
            }
        }
    )
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => {
        res.json(error);
    })
}