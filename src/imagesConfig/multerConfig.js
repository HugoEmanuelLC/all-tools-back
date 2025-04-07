import multer from "multer";
import path from "path";

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/bmp': 'bmp',
    'image/tiff': 'tiff',
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './public/images/uploads/tampon')
    },
    filename: function (req, file, cb) {
        // exemple de nom de fichier qui arrive : 'nom du fichier 123456789.jpg'
        // on veut remplacer les espaces par des underscores et ajouter un timestamp

        if (MIME_TYPES[file.mimetype]) {
            const name = file.originalname.split(' ').join('_');
            // const extension = MIME_TYPES[file.mimetype];
            const timestamp = Date.now();
            return cb(null, timestamp + '_' + name )
        }else{
            return cb(new Error('Seuls les fichiers JPG, JPEG et PNG sont autorisés.'), false);
        }
    }
});

const fileFilter = (req, file, cb) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext) ) {
        cb(null, true);
    } else {
        cb(new Error('Seuls les fichiers JPG, JPEG et PNG sont autorisés.'), false);
    }
};

const upload = multer({ storage, fileFilter });

export default upload;
// D'ici vers le sharpConfig pour redimensionner l'image et l'enregistrer dans un autre dossier (resized)
// puis vers fsDeleteImage pour supprimer l'image d'origine (tampon)
// puis vers la base de données pour enregistrer l'image dans la base de données
// puis vers la route pour envoyer la réponse au client