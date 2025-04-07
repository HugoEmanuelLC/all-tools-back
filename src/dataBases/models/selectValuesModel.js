import connection from "../dbConfigs/mysql.js";



/**
 * @param {object} values values.tableName, values.colonneName, values.colonneValue
 * @returns {Promise} status, message, data
 */
export async function modelSelectFromDB(values){
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `SELECT * FROM ${values.tableName} WHERE ${values.colonneName} = ?` + 
                    (values?.orderBy ? ` ORDER BY ${values.orderBy}` : ""), 
                values.colonneValue,
                (err, result) => {
                    if (err) {
                        console.log("modelSelectFromDB error");
                        console.log(err);
                        return reject({
                            status: 500, 
                            message: "server problem, sql error"
                        });
                    }

                    if (result.length > 0) {
                        resolve({
                            status: 200, 
                            message: "data found",
                            data: result
                        })

                    } else {
                        reject({
                            status: 204, 
                            message: "data not found"
                        });
                    }
            });
        } catch (error) {
            console.log("modelSelectFromDB error");
            console.log(error);
            reject({status: 500, message: "server problem, table sql error"});
        }
    });
}



export async function modelSelectLeftJoinFromDB(values){
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `SELECT ${values.select} FROM ${values.tableName} 
                LEFT JOIN ${values.tableName2} 
                ON ${values.colonneName} = ${values.colonneName2}`,
                (err, result) => {
                    if (err) {
                        console.log("modelSelectFromDB error");
                        console.log(err);
                        return reject({
                            status: 500, 
                            message: "server problem, sql error"
                        });
                    }

                    if (result.length > 0) {
                        resolve({
                            status: 200, 
                            message: "data found",
                            data: result
                        })

                    } else {
                        reject({
                            status: 204, 
                            message: "data not found"
                        });
                    }
            });
        } catch (error) {
            console.log("modelSelectFromDB error");
            console.log(error);
            reject({status: 500, message: "server problem, table sql error"});
        }
    });
}


export async function modelSelectAllFromDB(values){
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `SELECT * FROM ${values.tableName}` + 
                    (values.orderBy ? ` ORDER BY ${values.orderBy}` : ""),
                (err, result) => {
                    if (err) {
                        console.log("modelSelectFromDB error");
                        console.log(err);
                        return reject({
                            status: 500, 
                            message: "server problem, sql error"
                        });
                    }

                    if (result.length > 0) {
                        resolve({
                            status: 200, 
                            message: "data found",
                            data: result
                        })

                    } else {
                        reject({
                            status: 204, 
                            message: "data not found"
                        });
                    }
            });
        } catch (error) {
            console.log("modelSelectFromDB error");
            console.log(error);
            reject({status: 500, message: "server problem, table sql error"});
        }
    });
}



// traitement d'images
export async function selectImagesWithSections(values){
    // tables : jointure_image_sections, images, sections_images
    // jointure_image_sections : fk_image, fk_section
    
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                // `SELECT
                //     i.image_id,
                //     i.image_name,
                //     i.image_date,
                //     GROUP_CONCAT(si.section_name SEPARATOR ', ') AS sections_associees
                // FROM
                //     images i
                // LEFT JOIN
                //     jointure_image_sections jis ON i.image_id = jis.fk_image
                // LEFT JOIN
                //     sections_images si ON jis.fk_section = si.section_id
                // GROUP BY
                //     i.image_id, i.image_name, i.image_date;`,
                `SELECT 
                    i.image_id,
                    i.image_name,
                    i.image_date,
                    GROUP_CONCAT(si.section_name SEPARATOR ', ') AS sections_associees
                FROM images i
                LEFT JOIN sections_images si ON si.fk_image = i.image_id;`,
                (err, result) => {
                    if (err) {
                        console.log("modelSelectFromDB error");
                        console.log(err);
                        return reject({
                            status: 500, 
                            message: "server problem, sql error"
                        });
                    }

                    if (result.length > 0) {
                        resolve({
                            status: 200, 
                            message: "data found",
                            data: result
                        })

                    } else {
                        reject({
                            status: 204, 
                            message: "data not found"
                        });
                    }
            });
        } catch (error) {
            console.log("modelSelectFromDB error");
            console.log(error);
            reject({status: 500, message: "server problem, table sql error"});
        }
    });
}