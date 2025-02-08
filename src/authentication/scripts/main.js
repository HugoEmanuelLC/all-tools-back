// Scripts
import { 
    verifyEmailFormat, 
    // sendEmailForVerification, 
    verifyPassword, 
    verifyToken
} from "./script.js";


import { 
    verifyListUsersFromDb, 
    addNewUserInDb, 
    getUserInformations,
    updateUserPassword 
} from "./scriptDB.js";


export const test = () => {
    console.log("test ok");
};




// Exports functions for server
export const userRegister = async (
    body,
    conn={
        connection: null, 
        valueTable: {
            tableAuthName: "", 
            colonneEmailName: "", 
            colonneIdName: "",
        }
    }
) => {
    console.log("userRegister -> ok");
    return await new Promise((resolve, reject) => {
        const userInfos = body;
        verifyEmailFormat(userInfos.email)
        .then(() => {
            // console.log("verifyEmailFormat -> ok");
            verifyListUsersFromDb(body, conn)
            .then((data) => {
                // console.log("verifyListUsersFromDb -> ok");
                data.id ? body[conn.valueTable.colonneIdName] = data.id : null;
                addNewUserInDb(body, conn)
                .then((data) => {
                    console.log("addNewUserInDb -> ok");
                    let addNewUserInDbData = data;
                    console.log(addNewUserInDbData);
                    resolve(addNewUserInDbData);
                })
                .catch(error => {
                    console.log("addNewUserInDb -> error");
                    reject(error);
                });
            })
            .catch(error => {
                console.log("verifyListUsersFromDb -> error");
                reject(error);
            });
        })
        .catch(error => {
            console.log("verifyEmailFormat -> error");
            reject(error);
        });
    });
}



export const userLogin = (
    body,
    conn={
        connection: null, 
        valueTable: {
            tableAuthName: "", 
            colonneEmailName: "", 
            colonnePasswordName: "", 
            colonneIdName: ""
        },
        valueToken: {
            expiresIn: "24h",
            secretKey: "create_a_random_token"
        }
    }
) => {
    let userInfos = body;
    return new Promise((resolve, reject) => {

        if (conn.connection == null) {
            reject({
                status: 500, 
                message: "server problem", 
                info: "connection == null"
            })
            return
        }

        verifyEmailFormat(userInfos.email)
        .then(() => {
            // console.log("verifyEmailFormat -> ok");
            getUserInformations(body, conn)
            .then((data) => {
                // console.log("getUserInformations -> ok");
                verifyPassword(data, userInfos, conn)
                .then(data => {
                    // console.log("verifyPassword -> ok");
                    resolve(data);
                })
                .catch(error => {
                    console.log("verifyPassword -> error");
                    reject(error);
                });
            })
            .catch(error => {
                console.log("getUserInformations -> error");
                reject(error);
            });
        })
        .catch(error => {
            console.log("verifyEmailFormat -> error");
            // console.log(error);
            reject(error);
        });
    });
};



/**
 * Verifies the provided token.
 * @param {string} token - The token to be verified.
 * @param {string} secretKey - The secret key used for token signing.
 * @param {boolean} authentication - 
 *     - true: Verify the token for authentication purposes.
 *     - false: Verify the token for secret link verification (e.g., email links).
 * @returns {Promise} - A Promise that resolves with the decoded payload if verification succeeds, 
 *                     or rejects with an error if verification fails.
 */
export const verifySecretLinkAndToken = async (token, secretKey, authentication = true) => {
    const defaultMessages = {
        secretLink: {
            correct: "secret key verified with successful",
            notCorrect: "the secret key is not correct"
        },
        authentication: {
            correct: "token verified with successful",
            notCorrect: "the token is not correct"
        }
    }
    return await new Promise((resolve, reject) => {
        verifyToken(
            token, 
            secretKey, 
            authentication ? defaultMessages.authentication 
            : defaultMessages.secretLink
        )
        .then(data => resolve(data))
        .catch(error => reject(error))
    });
}



export const forgotPassword = (body, conn = {
    connection: null, 
    valueTable: {
        tableAuthName: "", 
        colonneEmailName: "", 
        colonneIdName: ""
    },
    contentEmail: {
        fromTitle: "",
        subject: "",
        title: "",
        message: "",
        urlVerify: "",
        btnText: "",
        randomToken: "create_a_random_secret_key_token"
    },
    configEmail: {}
}) => {
    // console.log("forgotPassword -> ok");
    let userInfos = body;
    return new Promise((resolve, reject) => {
        verifyEmailFormat(userInfos.email)
        .then(() => {
            // console.log("verifyEmailFormat -> ok");
            getUserInformations(body, conn)
            .then((data) => {
                let getUserInformationsData = data;
                resolve(getUserInformationsData);
            })
            .catch(error => {
                console.log("getUserInformations -> error");
                reject(error);
            });
        })
        .catch(error => {
            console.log("verifyEmailFormat -> error");
            reject(error);
        });
    });
};



export const resetPassword = (body, conn) => {
    return new Promise((resolve, reject) => {
        verifyEmailFormat(body.email)
        .then(() => {
            console.log("verifyEmailFormat -> ok");
            getUserInformations(body, conn)
            .then(data => {
                data.info[0].newPassword = body.password
                console.log("getUserInformations -> ok");
                updateUserPassword(data.info[0], conn)
                .then(data => {
                    console.log("updateUserPassword -> ok");
                    resolve(data);
                })
                .catch(error => {
                    console.log("updateUserPassword -> error");
                    reject(error);
                });
            })
            .catch(error => {
                console.log("getUserInformations -> error");
                reject(error);
            });
        })
        .catch(error => {
            console.log("verifyEmailFormat -> error");
            reject(error);
        });
    });
};