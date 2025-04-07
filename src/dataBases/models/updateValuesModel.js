import connection from "../dbConfigs/mysql.js";



/**
 * @param {object} values values.tableName, values.SETvalues, values.WHEREvalues
 * @returns {Promise} status, message
 */
export async function modelUpdateForDB(values){
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `UPDATE ${values.tableName} SET ${values.SETvalues} WHERE ${values.WHEREvalues}`,
                (err, result) => {
                    if (err) {
                        console.log("modelUpdateForDB error");
                        console.log(err);
                        return reject({
                            status: 500, 
                            message: "server problem, sql error"
                        });
                    }

                    if (result.affectedRows > 0) {
                        resolve({
                            status: 200, 
                            message: "data updated"
                        })

                    } else {
                        reject({
                            status: 400, 
                            message: "impossible to update"
                        });
                    }
            });
        } catch (error) {
            console.log("modelUpdateForDB error");
            console.log(error);
            reject({status: 500, message: "server problem, table sql error"});
        }
    });
}
