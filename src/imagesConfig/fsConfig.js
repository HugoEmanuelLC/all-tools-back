import fs, { unlinkSync} from 'fs';
import path from 'path';


const directoryPath = path.join('public', 'images', 'uploads', 'tampon'); // Chemin vers le dossier à vider

export const fsVerifSizeImage = async (req, res, next) => {
    try {
        if (!req.file) {
            console.log("fsVerifSize -> file not found")
            return res.status(400).json({ status: 400, message: "file not found" })
        }

        const filePath = req.file.path;
        const stats = fs.statSync(filePath);
        const fileSizeInBytes = stats.size;
        const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024); // Convertir en Mo

        console.log("File size in MB:", fileSizeInMegabytes);

        if (fileSizeInMegabytes > 0.5) { // 0.5 Mo
            return res.status(400).json({ status: 400, message: "file size too big" })
        }

        next()

    } catch (error) {
        console.log("fsVerifSize -> error");
        console.log(error);
        res.status(500).json({ status: 500, message: "server problem, impossible to verify size" })
    }
}


export const fsDeleteAllImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ status: 400, message: "file not found" })
        }

        const files = fs.readdirSync(directoryPath); // Lire le contenu du dossier tampon

        console.log("files", files.length);

        if (files.length > 0) {
            for (const file of files) {
                const filePath = path.join(directoryPath, file); // Chemin complet du fichier à supprimer
                unlinkSync(filePath); // Supprimer le fichier
                console.log(`File deleted: ${filePath}`);
                console.log("---------------------- File deleted successfully ----------------------");
            }
        }else{
            console.log("No files to delete in the tampon folder.");
        }
        
        next()
        
    } catch (error) {
        console.log("deleteImage -> error");
        console.log(error);
        res.status(500).json({ status: 500, message: "server problem, impossible to delete tampon" })
    }
}


export const fsDeleteImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ status: 400, message: "file not found" })
        }

        // Dossier pour les images redimensionnées
        const filePath = req.file.path;

        unlinkSync(filePath); // Supprimer le fichier d'origine après redimensionnement
        
        console.log("---------------------- File deleted successfully ----------------------");
        
        next()
        
    } catch (error) {
        console.log("deleteImage -> error");
        console.log(error);
        res.status(500).json({ status: 500, message: "server problem, impossible to delete tampon" })
    }
}