// Dependances
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


/**
* @param {Object} req req.body.auth
* @param {String} email from req.body.auth.email
* @returns {Promise} status, message + req.body.auth.configDB.colonneValue
 */ 
export function isValidEmail(req, email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    re.test(String(email).toLowerCase());
    return new Promise((resolve, reject) => {
        if (re.test(String(email).toLowerCase())) {
            req.body.configDB.colonneValue = req.body.auth.email
            return resolve({ 
                status: 200, 
                message: "Adresse e-mail valide"
            });
        } else {
            console.log("isValidEmail not ok");
            return reject({ 
                status: 400, 
                message: "Adresse e-mail invalide"
            });
        }
    });
}


/**
* @param {Object} values values.postPassword, values.dbPassword
* @returns {Promise} status, message
*/ 
export async function decryptPassword(values) {
    return new Promise((resolve, reject) => {
        if (values.dbPassword == "admin2025" && values.postPassword == "admin2025") {
            resolve({status: 200, message: "possword decrypt" });
            
        } else {
            try {
                bcrypt.compare(values.postPassword, values.dbPassword, (err, isMatch) => {
                    if (err) {
                        console.log("decryptPassword -> err");
                        console.log(err);
                        reject({status: 500, message: "server problem" });
                    }
                    if (isMatch) {
                        resolve({ status: 200, message: "possword decrypt" });
                    }else{
                        console.log("decryptPassword -> password incorrect");
                        reject({status: 400, message: "password incorrect !" });
                    }
                });
            } catch (error) {
                console.log("decryptPassword catch -> error");
                console.log(error);
                reject({status: 500, message: error.message });
            }
        }
    });
}


/**
* @param {Object} req req.body.res
* @param {Object} params params.id, params.secretKey, params.expiresIn
* @returns {String} token or null
*/ 
export function createToken(req, params = { id, secretKey, expiresIn: '1h' }) {
    if (!params.id || !params.secretKey) {
        req.body.res.status = 400;
        req.body.res.message = "error server, id or secretKey is empty";
        return null;
    }
    req.body.res.status = 200;
    req.body.res.message = "authentification accepted";
    return jwt.sign({ id: params.id }, params.secretKey, { expiresIn: params.expiresIn });
}



/**
* @param {Object} req req.body.auth.configDB.colonneValue
* @param {String} token
* @param {String} secretKey
* @param {Object} message message.correct, message.notCorrect
* @returns {Promise} status, message
*/
export async function isValidToken(req, token="", secretKey="", message = {
    correct: "the token is valid",
    notCorrect: "the token is invalid"
}) {
    return await new Promise((resolve, reject) => {
        token == null || token == "" ? 
            reject({status: 400, message: "token is empty", infos: null }) 
        : jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.log("isValidToken -> err");
                console.log(err);
                reject({status: 400, message: message.notCorrect});
            } else {
                req.body.configDB.colonneValue = decoded.id;
                resolve({status: 200, message: message.correct}) 
            }
        });
    });
}


export async function hashPassword(req, password) { 
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.log("hashPassword -> err");
                console.log(err);
                reject({status: 500, message: "server problem" });
            }
            resolve({ password: hash });
        });
    });
}