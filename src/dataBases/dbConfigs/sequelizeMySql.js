import { Sequelize } from "sequelize";
import {} from "dotenv";


const tables = [
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'restaurant_wawmomo',
    },
    {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        // waitForConnections: true,
        // connectionLimit: 10,
    }
]


const sequelize = new Sequelize({
    host: tables[0].host,
    username: tables[0].user,
    password: tables[0].password,
    database: tables[0].database,
    dialect: 'mysql', // ou 'mysql', 'sqlite', etc.
    logging: false, // désactiver les logs de requêtes SQL
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    dialectOptions: {
        connectTimeout: 60000, // 60 secondes
    },
    define: {
        timestamps: false, // désactiver les timestamps automatiques
    }
});


export {
    sequelize,
    // Sequelize,
}