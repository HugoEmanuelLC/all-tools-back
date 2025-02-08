export const PORT = 3001

// Configuration du CORS pour autoriser l'accès à l'API
const whitelist = [
    'http://localhost:5173',
    'http://localhost:8080',
    'http://192.168.0.176:8080',
    'http://localhost:3001',
    'http://localhost:3000'
];
export const corsOptionsCheck = (req, callback) => {
    let corsOptions;

    let isDomainAllowed = whitelist.indexOf(req.header('Origin')) !== -1;

    if (isDomainAllowed) {
        // Enable CORS for this request
        corsOptions = { origin: true }
    } else {
        // Disable CORS for this request
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}

