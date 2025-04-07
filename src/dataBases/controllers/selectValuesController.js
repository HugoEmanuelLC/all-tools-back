import * as selectValuesModel from '../models/selectValuesModel.js';



// AUTHENTIFICATION
export const selectValuesAuthFromDBbyEmail = async (req, res, next) => {
    try {
        req.body.configDB.tableName = "auth"
        req.body.configDB.colonneName = "email"

    } catch (error) {
        res.status(500).json({ status: 500, message: "server problem, impossible to select" })
    }

    await selectValuesModel.modelSelectFromDB({
        ...req.body.configDB
    })
    .then(data => {
        data.data.length > 0 ? req.body.configDB.infosFromDB = data.data[0] : null;

        req.body.res.status = data.status
        req.body.res.message = data.message
        req.body.res.content = {
            auth: {
                username: data.data[0].username,
                email: data.data[0].email
            }
        }
        next()
    })
    .catch(error => {
        console.log("selectValuesAuthFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    }) 
}


export const selectValuesAuthFromDBbyId = async (req, res, next) => {
    try {
        req.body.configDB.tableName = "auth"
        req.body.configDB.colonneName = "_id"

    } catch (error) {
        res.status(500).json({ status: 500, message: "server problem, impossible to select" })
    }

    await selectValuesModel.modelSelectFromDB({
        ...req.body.configDB
    })
    .then(data => {
        data.data.length > 0 ? req.body.configDB.infosFromDB = data.data[0] : null;

        req.body.res.status = data.status
        req.body.res.message = data.message

        req.body.res.content = { 
            auth: {
                username: data.data[0].username,
                email: data.data[0].email
            } 
        }
        next()
    })
    .catch(error => {
        console.log("selectValuesAuthFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    }) 
}




// MENUS
export const selectValuesMenusListFromDB = async (req, res, next) => {
    try {
        req.body.configDB.tableName = "menus"
        req.body.configDB.colonneName = "fk_auth"
        req.body.configDB.colonneValue = req.body.configDB.infosFromDB._id

    } catch (error) {
        res.status(500).json({ status: 500, message: "server problem, impossible to select" })
    }

    await selectValuesModel.modelSelectFromDB({
        ...req.body.configDB
    })
    .then(data => {
        let menus = [];
        data.data.forEach(menu => {
            menus.push({
                _id: menu._id,
                menu_name: menu.menu_name
            })
        })

        req.body.res.status = data.status
        req.body.res.message = data.message
        req.body.res.content = { menus: menus }
        next()
    })
    .catch(error => {
        console.log("selectValuesMenusListFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    }) 
}



export const selectValuesAllMenusListFromDB = async (req, res, next) => {
    try {
        req.body.configDB.tableName = "menus"

    } catch (error) {
        res.status(500).json({ status: 500, message: "server problem, impossible to select" })
    }

    await selectValuesModel.modelSelectAllFromDB({
        ...req.body.configDB
    })
    .then(data => {
        let menus = [];
        data.data.forEach(menu => {
            menus.push({
                _id: menu._id,
                menu_name: menu.menu_name
            })
        })

        req.body.res.status = data.status
        req.body.res.message = data.message
        req.body.res.content = { menus: menus }
        next()
    })
    .catch(error => {
        console.log("selectValuesAllMenusListFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    }) 
}


// PRODUCTS
export const selectValuesProductsListFromMenuFromDB = async (req, res, next) => {
    try {
        req.body.configDB.tableName = "products"
        req.body.configDB.colonneName = "fk_menu"
        req.body.configDB.orderBy = "product_name ASC"
        req.body.configDB.colonneValue = req.params.params

    } catch (error) {
        res.status(500).json({ status: 500, message: "server problem, impossible to select" })
    }

    await selectValuesModel.modelSelectFromDB({
        ...req.body.configDB
    })
    .then(data => {
        let products = [];
        data.data.forEach(product => {
            products.push({
                _id: product._id,
                product_name: product.product_name,
                product_price: product.product_price,
                product_description: product.product_description,
                fk_menu: product.fk_menu
            })
        })

        req.body.res.status = data.status
        req.body.res.message = data.message
        req.body.res.content = { products: products }
        next()
    })
    .catch(error => {
        console.log("selectValuesProductsListFromMenuFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    }) 
}



// TIMETABLE
export const selectValuesTimeTableFromDB = async (req, res, next) => {
    try {
        req.body.configDB.select = `
            timetable._id AS timetable_id, 
            timetable.comment, 
            hours._id AS hours_id, 
            hours.day_name, 
            hours.open, 
            hours.close
        `
        req.body.configDB.tableName = "timetable"
        req.body.configDB.tableName2 = "hours"
        req.body.configDB.colonneName = "timetable._id"
        req.body.configDB.colonneName2 = "hours.fk_timetable"

    } catch (error) {
        res.status(500).json({ status: 500, message: "server problem, impossible to select" })
    }

    await selectValuesModel.modelSelectLeftJoinFromDB({
        ...req.body.configDB
    })
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        req.body.res.content = { timetable: data.data }
        next()
    })
    .catch(error => {
        console.log("selectValuesTimeTableFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    }) 
}



// IMAGES
export const selectValuesImagesListFromDB = async (req, res, next) => {
    try {
        req.body.configDB.tableName = "images"
        req.body.configDB.colonneName = "fk_auth"
        req.body.configDB.colonneValue = req.body.configDB.infosFromDB._id

    } catch (error) {
        res.status(500).json({ status: 500, message: "server problem, impossible to select" })
    }

    await selectValuesModel.modelSelectFromDB({
        ...req.body.configDB
    })
    .then(data => {
        let images = [];
        data.data.forEach(image => {
            images.push({
                image_id: image.image_id,
                image_name: image.image_name,
                image_date: image.image_date,
                sectionHero: image.sectionHero,
                section4images_1: image.section4images_1,
                section4images_2: image.section4images_2,
                section4images_3: image.section4images_3,
                section4images_4: image.section4images_4,
                sectionGalleryLocation_1: image.sectionGalleryLocation_1,
                sectionGalleryLocation_2: image.sectionGalleryLocation_2,
                sectionGalleryLocation_3: image.sectionGalleryLocation_3,
                sectionLogo: image.sectionLogo,
            })
        })

        req.body.res.status = data.status
        req.body.res.message = data.message
        req.body.res.content = { images: images }
        next()
    })
    .catch(error => {
        console.log("selectValuesImagesListFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    })
}


// selectValuesImagesListFromDB

export const selectValuesImagesAllListFromDB = async (req, res, next) => {
    try {
        req.body.configDB.tableName = "images"

    } catch (error) {
        res.status(500).json({ status: 500, message: "server problem, impossible to select" })
    }

    await selectValuesModel.modelSelectAllFromDB(
        {
        ...req.body.configDB
    }
    )
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        req.body.res.content = { images: data.data }
        next()
    })
    .catch(error => {
        console.log("selectJointuresImagesSectionsFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    })
}