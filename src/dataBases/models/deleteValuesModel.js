import connection from "../dbConfigs/mysql.js";



export async function modelDeleteFromDB(values){
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `DELETE FROM ${values.tableName} WHERE ${values.colonneName} = ?`, values.colonneValue,
                (err, result) => {
                    if (err) {
                        console.log("modelDeleteFromDB error");
                        console.log(err);
                        return reject({
                            status: 500, 
                            message: "server problem, sql error"
                        });
                    }

                    if (result.affectedRows > 0) {
                        resolve({
                            status: 200, 
                            message: "data deleted"
                        })

                    } else {
                        reject({
                            status: 400, 
                            message: "impossible to delete"
                        });
                    }
            });
        } catch (error) {
            console.log("modelDeleteFromDB error");
            console.log(error);
            reject({status: 500, message: "server problem, table sql error"});
        }
    });
}


export async function deleteValuesProductFromDB(req, values){
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `DELETE FROM ${values.tableName} WHERE ${values.colonneName} = ?`, values.colonneValue,
                (err, result) => {
                    if (err) {
                        console.log("deleteValuesProductFromDB error");
                        console.log(err);
                        return reject({
                            status: 500, 
                            message: "server problem, sql error"
                        });
                    }

                    if (result.affectedRows > 0) {
                        resolve({
                            status: 200, 
                            message: "product deleted"
                        })

                    } else {
                        reject({
                            status: 400, 
                            message: "impossible to delete product"
                        });
                    }
            });
        } catch (error) {
            console.log("deleteValuesProductFromDB error");
            console.log(error);
            reject({status: 500, message: "server problem, table sql error"});
        }
    });
}



export async function deleteValuesMenuFromDB(req, values){
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `DELETE FROM ${values.tableName} WHERE ${values.colonneName} = ?`, values.colonneValue,
                (err, result) => {
                    if (err) {
                        console.log("deleteValuesMenuFromDB error");
                        console.log(err);
                        return reject({
                            status: 500, 
                            message: "server problem, sql error"
                        });
                    }

                    if (result.affectedRows > 0) {
                        resolve({
                            status: 200, 
                            message: "menu deleted"
                        })

                    } else {
                        reject({
                            status: 400, 
                            message: "impossible to delete menu"
                        });
                    }
            });
        } catch (error) {
            console.log("deleteValuesMenuFromDB error");
            console.log(error);
            reject({status: 500, message: "server problem, table sql error"});
        }
    });
}