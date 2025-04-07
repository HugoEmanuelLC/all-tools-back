import * as deleteValuesModel from '../models/deleteValuesModel.js';



export const deleteValuesMenuFromDB = async (req, res, next) => {
    try {
        req.body.configDB.tableName = "menus"
        req.body.configDB.colonneName = "_id"
        req.body.configDB.colonneValue = req.params.params
        
    } catch (error) {
        res.status(500).json({ status: 500, message: "server problem, impossible to delete" })
    }

    await deleteValuesModel.modelDeleteFromDB({
        ...req.body.configDB
    })
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        next()
    })
    .catch(error => {
        console.log("deleteValuesMenuFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    })
}



export const deleteValuesProductFromDB = async (req, res, next) => {
    try {
        req.body.configDB.tableName = "products"
        req.body.configDB.colonneName = "_id"
        req.body.configDB.colonneValue = req.params.params

    } catch (error) {
        res.status(500).json({ status: 500, message: "server problem, impossible to delete" })
    }

    await deleteValuesModel.modelDeleteFromDB({
        ...req.body.configDB
    })
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        next()
    })
    .catch(error => {
        console.log("deleteValuesProductFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    })
}



export const deleteValuesTimeTableDayFromDB = async (req, res, next) => {
    try {
        req.body.configDB.tableName = "hours"
        req.body.configDB.colonneName = "_id"
        req.body.configDB.colonneValue = req.params.params

    } catch (error) {
        res.status(500).json({ status: 500, message: "server problem, impossible to delete" })
    }

    await deleteValuesModel.modelDeleteFromDB({
        ...req.body.configDB
    })
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        next()
    })
    .catch(error => {
        console.log("deleteValuesTimeTableDayFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    })
}




export const deleteValuesImageFromDB = async (req, res, next) => {
    try {
        req.file = { path: "./public/images/uploads/resized/"+req.body.image }
        req.body.configDB.tableName = "images"
        req.body.configDB.colonneName = "image_id"
        req.body.configDB.colonneValue = req.params.params

    } catch (error) {
        res.status(500).json({ status: 500, message: "server problem, impossible to delete" })
    }

    await deleteValuesModel.modelDeleteFromDB({
        ...req.body.configDB
    })
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        next()
    })
    .catch(error => {
        console.log("deleteValuesImageFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    })
}