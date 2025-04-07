export const PORT = 3001

// Configuration du CORS pour autoriser l'accès à l'API
const whitelist = [
    [
        'http://localhost:8080',
        'http://localhost:3001',
        
    ],
    [
        'https://wawmomo-website-test.root.caprover.clavinas.com',
        'http://srv-captain--wawmomo-website-test',
    ]
];
export const corsOptionsCheck = (req, callback) => {
    let corsOptions;

    let isDomainAllowed = whitelist[1].indexOf(req.header('Origin')) !== -1;

    if (isDomainAllowed) {
        // Enable CORS for this request
        corsOptions = { origin: true }
    } else {
        // Disable CORS for this request
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}

