// Dependencies
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

// import path from 'path';

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
import routeFront from './routes/routeFront.js';
import routeViews from './routes/routeViews.js';


const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Création d'un bus d'événements
// qui permettra de communiquer entre les différents modules
// de l'application
const bus = new EventEmitter();
bus.setMaxListeners(20);

app.use(cors(corsOptionsCheck));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'))
// app.use(express.static('src/views'));

// express.urlencoded() permet de parser les données envoyées par le client
// app.use(express.urlencoded({ extended: true }));

io.on('connection', (socket) => {
    console.log('User connected: ', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected: ', socket.id);
    });

    socket.on('chat message', (msg) => {
        console.log('Message received: ', msg);
        io.emit('chat message', msg);
    });
});

app.use("/", routeFront)
app.use("/auth", routeAuth)
app.use('/views', routeViews)

app.get('*', (req, res) => {
    console.log('Error 404, url not found');
    res.status(404).json({message: 'Page not found'})
});

server.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});