# COMPONENT AUTHENTICATION (Node/Express)


## scripts / main.js 

- #### Dépendancies
    - import jwt from "jsonwebtoken";
    - import bcrypt from "bcrypt";

- #### exp fnc userRegister(body, conn)
    - imp fnc verifyEmailFormat(email)
        - then()
            - imp fnc verifyListUsersFromDb(body, conn)
                - then()
                    - imp fnc addNewUserInDb(body, conn)
                        - then(data)
                            - resolve(data)
                        - catch(error)
                            reject(error)
                - catch(error)
                    - reject(error)
        - catch(error)
            - reject(error)

- #### exp fnc userLogin(body, conn, valueToken)
    - imp fnc verifyEmailFormat(email)
        - then()
            - imp fnc getUserInformations(body, conn)
                - then()
                    - imp fnc verifyPassword(body, conn)
                        - then(data)
                            - resolve(data)
                        - catch(error)
                            reject(error)
                - catch(error)
                    - reject(error)
        - catch(error)
            - reject(error)

- #### exp fnc verifySecretKeyAndToken(token, secretKey, boolean)
    ``` "boolean" true: for authentication, false: for verify link from email ```
    - imp fnc verifyToken(token, secretKey, messages)
        - then(data)
            - resolve(data)
        - catch(error)
            - reject(error)

- #### exp fnc forgotPassword(body, conn)
    ``` "boolean" true: for authentication, false: for verify link from email ```
    - imp fnc verifyToken(token, secretKey, messages)
        - then(data)
            - resolve(data)
        - catch(error)
            - reject(error)


## Models / emailModel.js

- #### exp fnc sendLinkVerifyEmail(req, res)
    - fnc configSendLink(contentEmail, req, res)
        - imp fnc sendEmailForVerification(content, configEmail, valueToken)
        - return res.status().json()

- #### exp fnc sendLinkForgotPassword(req, res)
    - fnc configSendLink(contentEmail, req, res)
        - imp fnc sendEmailForVerification(content, configEmail, valueToken)
        - return res.status().json()


## Models / emailController.js

- #### exp fnc sendLinkVerifyEmail
    - imp fnc sendEmail.sendLinkVerifyEmail

- #### exp fnc sendLinkForgotPassword
    - imp fnc sendEmail.sendLinkForgotPassword
