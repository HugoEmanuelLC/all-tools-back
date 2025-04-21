// Dependencies
import { Router } from "express"

const routeViews = Router()

routeViews.get('/test', (req, res) => {
    res.sendFile('test.html', { root: './src/views' });
})

routeViews.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './src/views/auth' });
})

routeViews.get('/upload-image', (req, res) => {
    res.sendFile('uploadImages.html', { root: './src/views/images' });
})

routeViews.get('/chat', (req, res) => {
    res.sendFile('chat.html', { root: './src/views/chat' });
})

export default routeViews