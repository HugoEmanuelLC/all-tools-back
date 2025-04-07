// Dependencies
import express from 'express';
import cors from 'cors';

// le module morgan permet de logger les requêtes http
// il est très utile pour le débogage
import morgan from 'morgan';

// le module events est un module natif de nodejs
// il permet de créer des événements personnalisés
// et de les écouter
import { EventEmitter } from 'events';


// Middlewares
import { PORT, corsOptionsCheck } from './config.js';
// import { verifConnectionDb } from './dataBases/dbConfigs/mysql.js';
import routeAuth from './routes/routeAuth.js';
import route from './routes/route.js';


const app = express();

// Création d'un bus d'événements
// qui permettra de communiquer entre les différents modules
// de l'application
const bus = new EventEmitter();
bus.setMaxListeners(20);

app.use(cors(corsOptionsCheck));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'))

// app.use(verifConnectionDb)
// verifConnectionDb()


app.use("/", route)
app.use("/auth", routeAuth)


app.get('*', (req, res) => {
    console.log('Error 404, url not found');
    res.status(404).json({message: 'Page not found'})
});

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});