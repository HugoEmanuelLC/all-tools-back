import * as updateValuesModel from '../models/updateValuesModel.js';



export const updateValuesAuthPasswordFromDB = async (req, res, next) => {
    try {
        let SETvalues = ""
        req.body.configDB.tableName = "auth"
        req.body.configDB.colonneName = ["_id", "password"]
        req.body.configDB.colonneValue = req.body.configDB.infosFromDB._id
    
        req.body.configDB.colonneName.forEach((element, index) => {
            element !== req.body.configDB.colonneName[0] ? 
            SETvalues += `${element} = "${req.body.auth.password}"${index < req.body.configDB.colonneName.length - 1 ? "," : ""}` 
            : req.body.configDB.WHEREvalues = `${element} = ${req.body.configDB.infosFromDB._id}`
        })
    
        req.body.configDB.SETvalues = SETvalues
        
    } catch (error) {
        res.status(500).json({ status: 500, message: "server problem, impossible to update" })
    }

    await updateValuesModel.modelUpdateForDB({
        ...req.body.configDB
    })
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        req.body.res.content = { auth: data.auth }
        next()
    })
    .catch(error => {
        console.log("updateValuesAuthPasswordFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    }) 
}



export const updateValuesMenuFromDB = async (req, res, next) => {
    try {
        let SETvalues = ""
        req.body.configDB.tableName = "menus"
        req.body.configDB.colonneName = ["_id", "menu_name"]
        req.body.configDB.colonneValue = req.params.params
        
        req.body.configDB.colonneName.forEach((element, index) => {
            element !== req.body.configDB.colonneName[0] ? 
            SETvalues += `${element} = "${req.body.menu[element]}"${index < req.body.configDB.colonneName.length - 1 ? "," : ""}` 
            : req.body.configDB.WHEREvalues = `${element} = ${req.params.params}`
        })
    
        req.body.configDB.SETvalues = SETvalues

    } catch (error) {
        res.status(500).json({ status: 500, message: "server problem, impossible to update" })
    }

    await updateValuesModel.modelUpdateForDB({
        ...req.body.configDB
    })
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        req.body.res.content = { menu: data.menu }
        next()
    })
    .catch(error => {
        console.log("updateValuesMenuFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    })
}



export const updateValuesProduitFromDB = async (req, res, next) => {
    try {
        let SETvalues = ""
        req.body.configDB.tableName = "products"
        req.body.configDB.colonneName = ["_id", "product_name", "product_description", "product_price"]
        req.body.configDB.colonneValue = req.params.params

        req.body.configDB.colonneName.forEach((element, index) => {
            element !== req.body.configDB.colonneName[0] ? 
            SETvalues += `${element} = "${req.body.product[element]}"${index < req.body.configDB.colonneName.length - 1 ? "," : ""}` 
            : req.body.configDB.WHEREvalues = `${element} = ${req.params.params}`
        })

        req.body.configDB.SETvalues = SETvalues

    } catch (error) {
        res.status(500).json({ status: 500, message: "server problem, impossible to update" })
    }

    await updateValuesModel.modelUpdateForDB({
        ...req.body.configDB
    })
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        req.body.res.content = { produit: data.produit }
        next()
    })
    .catch(error => {
        console.log("updateValuesProduitFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    }) 
}



export const updateValuesTimeTableDayFromDB = async (req, res, next) => {
    try {
        let SETvalues = ""
        req.body.configDB.tableName = "hours"
        req.body.configDB.colonneName = ["_id", "day_name", "open", "close"]
        req.body.configDB.colonneValue = req.params.params

        req.body.configDB.colonneName.forEach((element, index) => {
            element !== req.body.configDB.colonneName[0] ? 
            SETvalues += `${element} = "${req.body.timetable[element]}"${index < req.body.configDB.colonneName.length - 1 ? "," : ""}` 
            : req.body.configDB.WHEREvalues = `${element} = ${req.params.params}`
        })

        req.body.configDB.SETvalues = SETvalues

    } catch (error) {
        res.status(500).json({ status: 500, message: "server problem, impossible to update" })
    }

    await updateValuesModel.modelUpdateForDB({
        ...req.body.configDB
    })
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        req.body.res.content = { timetable: data.timetable }
        next()
    })
    .catch(error => {
        console.log("updateValuesTimeTableFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    }) 
}



export const updateValuesTimeTableCommentFromDB = async (req, res, next) => {
    try {
        let SETvalues = ""
        req.body.configDB.tableName = "timetable"
        req.body.configDB.colonneName = ["_id", "comment"]
        req.body.configDB.colonneValue = req.params.params

        req.body.configDB.colonneName.forEach((element, index) => {
            element !== req.body.configDB.colonneName[0] ? 
            SETvalues += `${element} = "${req.body.timetable[element]}"${index < req.body.configDB.colonneName.length - 1 ? "," : ""}` 
            : req.body.configDB.WHEREvalues = `${element} = ${req.params.params}`
        })

        req.body.configDB.SETvalues = SETvalues

    } catch (error) {
        res.status(500).json({ status: 500, message: "server problem, impossible to update" })
    }

    await updateValuesModel.modelUpdateForDB({
        ...req.body.configDB
    })
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        req.body.res.content = { timetable: data.timetable }
        next()
    })
    .catch(error => {
        console.log("updateValuesTimeTableFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    }) 
}







export const updateValuesImageFromDB = async (req, res, next) => {
    try {
        if( req.body.image.tableName.length == 0 || req.body.image.value.length == 0 ){ 
            return res.status(400).json({ status: 400, message: "no data to modify" })
        }
        
        let SETvalues = ""
        req.body.configDB.tableName = "images"
        req.body.configDB.colonneName = ["image_id", ...req.body.image.tableName]
        req.body.configDB.colonneValue = req.params.params

        req.body.configDB.colonneName.forEach((element, index) => {
            element !== req.body.configDB.colonneName[0] ? 
            SETvalues += `${element} = "${req.body.image.value[index-1]}"${index < req.body.configDB.colonneName.length - 1 ? "," : ""}` 
            : req.body.configDB.WHEREvalues = `${element} = ${req.params.params}`
        })

        req.body.configDB.SETvalues = SETvalues

    } catch (error) {
        res.status(500).json({ status: 500, message: "server problem, impossible to update" })
    }

    await updateValuesModel.modelUpdateForDB({
        ...req.body.configDB
    })
    .then(data => {
        req.body.res.status = data.status
        req.body.res.message = data.message
        req.body.res.content = { produit: data.produit }
        next()
    })
    .catch(error => {
        console.log("updateValuesImageFromDB -> error");
        console.log(error);
        res.status(error.status).json(error)
    })
}



