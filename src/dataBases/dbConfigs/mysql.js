import mysql from 'mysql';
import {} from "dotenv/config";

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
        waitForConnections: true,
        connectionLimit: 10,
    }
]

const connection = mysql.createPool(tables[0]);

async function initialiserBaseDeDonnees() {
    return new Promise((resolve, reject) => {
        connection.getConnection((err, connection) => {
            if (err) {
                console.log("Error connecting to database ");
                console.log(err);
                reject(err);
                return;
            }
            console.log('Connection established');
            connection.release(); // Libérer la connexion après le test
            resolve();
        });
    });
}

async function demarrerServeur() {
    try {
        await initialiserBaseDeDonnees();
        // Votre code de démarrage du serveur Express.js ici
        // app.listen(3001, () => {
        //     console.log('Serveur démarré sur le port 3001');
        // });
    } catch (error) {
        console.error('Échec de l\'initialisation de la base de données :', error);
        // Gérer l'erreur de démarrage, par exemple, arrêter l'application
    }
}

// connection.connect((err) => {
//     if (err) {
//         console.log("Error connecting to database ");
//         console.log(err);
//         return;
//     }
//     console.log('Connection established');
// });

// export const verifConnectionDb = (req, res, next) => {
//     if (connection._protocol._fatalError) {
//         console.log('Error connecting to Db mysql');
//         console.log(connection._protocol._fatalError);
//         return res.status(500).json({ status: 500, message: "Accès à la DB temporairement indisponible", infos: connection._protocol._fatalError });
    
//     }else{
//         console.log('Connection established encore');
//         // next();
//     }
// }

demarrerServeur();

export default connection;