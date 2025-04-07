// Dependencies
import { Router } from "express"
import {} from 'dotenv/config'

// Controllers
import * as authController from '../authentication/controllers/authController.js'
import * as emailController from '../emails/controllers/emailController.js'
import * as selectValuesController from '../dataBases/controllers/selectValuesController.js'
import * as updateValuesController from '../dataBases/controllers/updateValuesController.js'
import * as deleteValuesController from '../dataBases/controllers/deleteValuesController.js'
import * as createValuesController from '../dataBases/controllers/createValuesController.js'
// import * as insertValuesController from '../dataBases/controllers/insertValuesController.js'
// import * as deleteValuesController from '../dataBases/controllers/deleteValuesController.js'
import upload from '../imagesConfig/multerConfig.js'
// import sharpConfig from "../imagesConfig/sharpConfig.js"
import { fsDeleteImage } from "../imagesConfig/fsConfig.js" 
import jimpConfig from "../imagesConfig/jimConfig.js"


const routeAuth = Router()



const list = [
    { url: "/auth/login", method: "POST", description: "Login" },
    { url: "/auth/forgot-password", method: "POST", description: "Forgot password" },
    { url: "/auth/update-password", method: "POST", description: "Update password" },
    { url: "/auth/verif-session", method: "POST", description: "Verify session" },
    { url: "/auth/menus/select", method: "GET", description: "Select menus" },
    { url: "/auth/products/select/:params", method: "GET", description: "Select products" },
    { url: "/auth/product/update/:params", method: "PUT", description: "Update product" }
]




// Middlewares
function modelObjectBodyForSessionForReq(req, res, next){
    req.body.configDB = { tableName: null, colonneName: null, colonneValue: null, infosFromDB: {} } 
    req.body.configToken = { secretKey: null, expiresIn: null }
    req.body.res = { status: 0, message: "", token: "", content: { auth: {}, menus: {}, products: {} } }
    next()
}
function modelFncForSendResToClient(req, res) {
    res.status(req.body.res.status).json({
        status: req.body.res.status,
        message: req.body.res.message,
        content: {...req.body.res.content},
        token: req.body.res.token
    })
}
function treatmentInfosFromDB(req, res, next){
    if (req.body.configDB.infosFromDB?.password == undefined) {
        req.body.configDB.infosFromDB = req.infosFromDB
    } else {
        const { password, ...infosFromDB } = req.body.configDB.infosFromDB
        req.infosFromDB = infosFromDB
        req.body.configDB.infosFromDB = infosFromDB
    }
    next()
}


routeAuth.use( modelObjectBodyForSessionForReq )
routeAuth.get('/', (req, res) => res.status(200).json({ message: "List d'authentication:", list: list }) )



// Authentication
routeAuth.post('/login', 
    authController.isValidEmail, selectValuesController.selectValuesAuthFromDBbyEmail, authController.isValidPassword,
    treatmentInfosFromDB, authController.createToken, modelFncForSendResToClient
)
routeAuth.post('/forgot-password', 
    authController.isValidEmail, selectValuesController.selectValuesAuthFromDBbyEmail, treatmentInfosFromDB, authController.createToken,
    emailController.sendEmailForVerification, modelFncForSendResToClient 
)
routeAuth.post('/update-password', 
authController.isValidToken, selectValuesController.selectValuesAuthFromDBbyId, authController.hashPassword,
updateValuesController.updateValuesAuthPasswordFromDB, modelFncForSendResToClient 
)

// for all routes below, the token must be present in the header
routeAuth.use( authController.isValidToken, selectValuesController.selectValuesAuthFromDBbyId, treatmentInfosFromDB )
routeAuth.post('/verif-session', authController.createToken, modelFncForSendResToClient )



// routeAuth.get('/user-infos', selectValuesController.getValuesUserInfosFromDB, modelFncForSendResToClient )
// routeAuth.put('/user-infos', updateValuesController.updateValuesUserInfosFromDB, modelFncForSendResToClient )
// routeAuth.post('/user-infos', insertValuesController.insertValuesUserInfosFromDB, modelFncForSendResToClient )
// routeAuth.delete('/user-infos', deleteValuesController.deleteValuesUserInfosFromDB, modelFncForSendResToClient )



// Menus
routeAuth.get('/menus/select', 
    selectValuesController.selectValuesMenusListFromDB, modelFncForSendResToClient 
)
routeAuth.post('/menu/create',
    createValuesController.createValuesMenuInDB, modelFncForSendResToClient
)
routeAuth.put('/menu/update/:params',
    updateValuesController.updateValuesMenuFromDB, modelFncForSendResToClient
)
routeAuth.delete('/menu/delete/:params',
    deleteValuesController.deleteValuesMenuFromDB, modelFncForSendResToClient
)



// Products
routeAuth.get('/products/select/:params', 
    selectValuesController.selectValuesProductsListFromMenuFromDB, modelFncForSendResToClient 
)
routeAuth.post('/product/create/:params',
    createValuesController.createValuesProductInDB, modelFncForSendResToClient
)
routeAuth.put('/product/update/:params', 
    updateValuesController.updateValuesProduitFromDB, modelFncForSendResToClient
)
routeAuth.delete('/product/delete/:params',
    deleteValuesController.deleteValuesProductFromDB, modelFncForSendResToClient
)



// TimeTable
routeAuth.get('/time-table/select', 
    selectValuesController.selectValuesTimeTableFromDB, modelFncForSendResToClient 
)
routeAuth.put('/time-table-day/update/:params',
    updateValuesController.updateValuesTimeTableDayFromDB, modelFncForSendResToClient
)
routeAuth.post('/time-table-day/create/:params',
    createValuesController.createValuesTimeTableDayInDB, modelFncForSendResToClient
)
routeAuth.delete('/time-table-day/delete/:params',
    deleteValuesController.deleteValuesTimeTableDayFromDB, modelFncForSendResToClient
)
routeAuth.put('/time-table-comment/update/:params',
    updateValuesController.updateValuesTimeTableCommentFromDB, modelFncForSendResToClient
)
routeAuth.delete('/time-table-comment/delete/:params',
    updateValuesController.updateValuesTimeTableCommentFromDB, modelFncForSendResToClient
)









// Images
routeAuth.post('/image/create', 
    upload.single('file'), 
    (err, req, res, next) => {
        if (err) { return res.status(400).json({ error: err.message }); }
        next() },
    modelObjectBodyForSessionForReq, treatmentInfosFromDB, jimpConfig, fsDeleteImage,
    createValuesController.createValuesImageInDB, modelFncForSendResToClient 
)
// Sections jointure images
routeAuth.get('/images/select',
    selectValuesController.selectValuesImagesListFromDB, modelFncForSendResToClient
)
routeAuth.put('/image/update/:params',
    updateValuesController.updateValuesImageFromDB, modelFncForSendResToClient
)
routeAuth.delete('/image/delete/:params',
    deleteValuesController.deleteValuesImageFromDB, fsDeleteImage, modelFncForSendResToClient
)




















// routeAuth.post('/sections-images/create/:params',
//     createValuesController.createValuesSectionsForImagesInDB, modelFncForSendResToClient
// )
// routeAuth.post('/sections-images/delete/:params',
//     // deleteValuesController.deleteValuesSectionsImagesFromDB, modelFncForSendResToClient
// )
// routeAuth.get('/jointure-images-sections/select', 
//     selectValuesController.selectJointuresImagesSectionsFromDB, modelFncForSendResToClient
// )



// routeAuth.put('/menu/:params', updateValuesController.updateValuesMenuItemFromDB, modelFncForSendResToClient )
// routeAuth.post('/menu/:params', insertValuesController.insertValuesMenuItemFromDB, modelFncForSendResToClient )
// routeAuth.delete('/menu/:params', deleteValuesController.deleteValuesMenuItemFromDB, modelFncForSendResToClient )

// routeAuth.get('/products_list', selectValuesController.getValuesProductsListFromDB, modelFncForSendResToClient )
// routeAuth.get('/product/:params', selectValuesController.getValuesProductFromDB, modelFncForSendResToClient )
// routeAuth.put('/product/:params', updateValuesController.updateValuesProductFromDB, modelFncForSendResToClient )
// routeAuth.post('/product/:params', insertValuesController.insertValuesProductFromDB, modelFncForSendResToClient )
// routeAuth.delete('/product/:params', deleteValuesController.deleteValuesProductFromDB, modelFncForSendResToClient )

// routeAuth.get('/time-table', selectValuesController.getValuesTimeTableFromDB, modelFncForSendResToClient )
// routeAuth.put('/time-table', updateValuesController.updateValuesTimeTableFromDB, modelFncForSendResToClient )
// routeAuth.post('/time-table', insertValuesController.insertValuesTimeTableFromDB, modelFncForSendResToClient )
// routeAuth.delete('/time-table', deleteValuesController.deleteValuesTimeTableFromDB, modelFncForSendResToClient )

export default routeAuth