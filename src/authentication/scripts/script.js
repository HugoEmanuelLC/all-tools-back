// Dependances
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



// Scripts
function createToken(params = { id, secretKey, expiresIn: '1h' }) {
    return jwt.sign({ id: params.id }, params.secretKey, { expiresIn: params.expiresIn });
}



export function verifyEmailFormat(params) {
    return new Promise((resolve, reject) => {
        if (params.includes('@')) {
            resolve({ status: 200, message: "email is valid", info: null });
        } else {
            console.log("email is invalid");
            reject({ status: 400, message: "email is invalid", info: null });
        }
    });
}


export async function verifyPassword(result, userInfos, conn) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(userInfos.password, result.info[0][conn.valueTable.colonnePasswordName], (err, isMatch) => {
            if (err) {
                reject({status: 500, message: "server problem", info: err });
            }
            if (isMatch) {
                let token = createToken(
                    {
                        id: result.info[0][conn.valueTable.colonneIdName], 
                        secretKey: conn.valueToken.secretKey, 
                        expiresIn: conn.valueToken?.expiresIn
                    }
                );
                resolve({status: 200, message: "authentification accepted", info: result.info[0], token: token });
            }else{
                reject({status: 400, message: "your email or password is incorrect !", info: isMatch });
            }
        });
    });
}



export async function verifyToken(token="", secretKey="", message = {
    correct: "",
    notCorrect: ""
}) {
    console.log("verifyToken -> token", token);
    return await new Promise((resolve, reject) => {
        token == null || token == "" ? reject({status: 400, message: "token is empty", info: null }) 
        : jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                reject({status: 400, message: message.notCorrect, info: err});
            } else {
                resolve({status: 200, message: message.correct, info: decoded}) 
            }
        });
    });
}