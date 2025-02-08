// Dependencies
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';


// Middlewares
import { PORT, corsOptionsCheck } from './config.js';
import { verifConnectionDb } from './dbConfigs/mysql.js';
import routeAuth from './routes/routeAuth.js';
import { verifSession } from './middlewares/verifSession.js';
import { verifDomain } from './middlewares/verifDomain.js';


const app = express();


app.use(cors(corsOptionsCheck));
app.use(morgan('dev'));
app.use(express.json());

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});

app.use(verifConnectionDb)

app.use("/auth", routeAuth)
app.get("/", (req, res) => {
    res.send("Hello world")
})
app.get("/page", verifSession, (req, res) => {
    res.status(200).json({ message: "auth ok", user: req.user });
})
app.get("/domain", verifSession, verifDomain)
app.get('*', (req, res) => {
    console.log('404');
    res.status(404).json({message: 'Page not found'})
});