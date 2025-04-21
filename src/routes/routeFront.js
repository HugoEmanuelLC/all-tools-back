// Dependencies
import { Router } from "express"

// Controllers
import * as selectValuesController from '../dataBases/controllers/selectValuesController.js'
import * as selectController from '../dataBases/controllers/selectController.js'
import * as createController from '../dataBases/controllers/createController.js'
import * as updateController from '../dataBases/controllers/updateController.js'


const routeFront = Router()


const list = [
    { url: "/menus/select", method: "GET", description: "Select menus" },
    { url: "/products/select/:params", method: "GET", description: "Select products" },
    { url: "/time-table/select", method: "GET", description: "Select time-table" }
]




// Middlewares
function modelObjectBodyForSessionForReq(req, res, next){
    req.body.configDB = { tableName: null, colonneName: null, colonneValue: null, infosFromDB: {} } 
    req.body.configToken = { secretKey: null, expiresIn: null }
    req.body.res = { status: 0, message: "", content: { menus: {}, products: {}, timetable: {} } }
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



routeFront.use( modelObjectBodyForSessionForReq )
routeFront.get('/', (req, res) => res.status(200).json({ message: "List d'access", list: list }) )



// Menus
routeFront.get('/menus-list', 
    selectValuesController.selectValuesAllMenusListFromDB, modelFncForSendResToClient 
)






// test Sequelize
routeFront.get('/menus',
    selectController.getAllMenus, modelFncForSendResToClient 
)
routeFront.get('/products/:menuId',
    selectController.getAllProductsOfMenu, modelFncForSendResToClient 
)
routeFront.get('/new-menu',
    (req, res, next) => {
        req.body.menu_name = "test"
        req.body.configDB.infosFromDB = { _id: 263}
        next()
    },
    createController.createMenu, modelFncForSendResToClient
)
routeFront.get('/new-product/:menuId',
    (req, res, next) => {
        req.body.product_name = "test"
        req.body.product_price = 10
        req.body.product_description = "test"
        req.body.fk_menu = req.params.menuId
        req.body.configDB.infosFromDB = { _id: 263}
        next()
    },
    createController.createProduct, modelFncForSendResToClient
)






// Products
routeFront.get('/products-from-menu/:params', 
    selectValuesController.selectValuesProductsListFromMenuFromDB, modelFncForSendResToClient 
)


// TimeTable
routeFront.get('/timetable-list', 
    selectValuesController.selectValuesTimeTableFromDB, modelFncForSendResToClient 
)


// Images
routeFront.get('/images-list',
    selectValuesController.selectValuesImagesAllListFromDB, modelFncForSendResToClient
)



export default routeFront