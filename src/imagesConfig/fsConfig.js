import { unlinkSync} from 'fs';



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