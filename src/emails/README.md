# COMPONENT EMAIL (Node/Express)


## scripts / send-emails.js 

- #### Dépendancies
    - import jwt from "jsonwebtoken";
    - import nodemailer from "nodemailer";

- #### exp fnc sendEmailForVerification(contentEmail, configEmail, valueToken)
    - create token
    - send email with secret link 
    - return messages
        - {status: 200, message: 'email sent'}
    or 
        - {status: 500, message: 'email error occurred'}


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
