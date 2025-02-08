// Dependencies
import { Router } from "express"
// Controllers
import * as authController from '../authentication/controllers/authController.js'
// import * as emailController from '../emails/controllers/emailController.js'

import * as appController from '../controllers/appController.js'

const routeAuth = Router()

const list = [
    {
        name: "register",
        url: "/auth/register",
        method: "POST"
    },
    {
        name: "login",
        url: "/auth/login",
        method: "POST"
    },
    {
        name: "verify-auth",
        url: "/auth/verify-auth",
        method: "GET"
    },
    {
        name: "forgot-password",
        url: "/auth/forgot-password",
        method: "POST"
    },
    {
        name: "recover-password",
        url: "/auth/recover-password",
        method: "GET"
    },
    {
        name: "update-password",
        url: "/auth/update-password",
        method: "GET"
    },
    {
        name: "verify-email-register",
        url: "/auth/verify-email-register",
        method: "GET"
    },
    {
        name: "verify-email-forget-password",
        url: "/auth/verify-email-forget-password",
        method: "GET"
    }
]

// get's tests
routeAuth.get('/', (req, res) => {
    res.status(200).json({ message: "List d'authentication:", list: list })
})
// routeAuth.get('/register', appController.register)
// routeAuth.get('/login', authController.login)


// C'est fait
routeAuth.post('/register', appController.register)
routeAuth.post('/verify-link', appController.verifyEmail)
routeAuth.post('/login', appController.login)


// routeAuth.get('/register', authController.register, emailController.sendLinkVerifyEmail )


// routeAuth.get('/forgot-password', authController.sendLinkForgotPassword)
// routeAuth.get('/recover-password', authController.sendRecoverPassword)
// routeAuth.get('/update-password', authController.sendNewPassword)
// // post's
// // routeAuth.post('/register', authController.register)
// routeAuth.post('/login', authController.login)
// routeAuth.post('/forgot-password', authController.sendLinkForgotPassword)
// // get's
// routeAuth.get('/verify-email-register', authController.verifyEmail)
// routeAuth.get('/verify-email-forget-password', authController.verifyEmail)

export default routeAuth