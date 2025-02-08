import mysql from 'mysql';
import {} from "dotenv/config";

const tables = [
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'webexperience',
    },
    {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
    }
]

const connection = mysql.createConnection(tables[0]);

connection.connect((err) => {
    if (err) {
        // console.log("Error connecting to database ", err);
        console.log('Error connecting to Db mysql');
        return;
    }
    console.log('Connection established');
});

export const verifConnectionDb = (req, res, next) => {
    if (connection._protocol._fatalError) {
        // console.log('Error connecting to Db mysql');
        // console.log(connection._protocol._fatalError.sqlMessage);
        return res.status(500).json({ status: 500, error: "server problem" });
    }else{
        next();
    }
}

export default connection;