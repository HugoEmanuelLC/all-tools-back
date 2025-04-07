import { Jimp } from 'jimp';
import path from 'path';

const jimpConfig = async (req, res, next) => {
    const extensionsPossible = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'];

    try {
        if (!req.file) {
            return res.status(400).json({ status: 400, message: "file not found" })
        }

        let tampon = req.file.originalname.split('.')
        let extension = tampon[tampon.length - 1]

        extensionsPossible.includes('.' + extension) ?
            console.log("file extension is valid")
            : res.status(400).json({ status: 400, message: "file extension not valid" })

        const filePath = req.file.path;
        const newFileName = Date.now() + '_' + 'resize_' + req.file.originalname;
        
        // Dossier pour les images redimensionnées
        const resizeFilePath = path.join('./public/images/uploads/resized', newFileName);
        
        const image = await Jimp.read(filePath);

        console.log("----------------------- File resized with Jimp ----------------------");
        // Redimensionnement avec Jimp
        await image.resize({ w: 1000}) // Redimensionner l'image à 1000px de large, hauteur auto

        console.log("---------------------- File resized and saved ----------------------");
        await image.write(resizeFilePath); // Enregistrer l'image redimensionnée

        console.log("---------------------- File resized successfully ----------------------");

        // date de creation de l'image
        const timestamp = Date.now();
        const date = new Date(timestamp);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() renvoie un index de 0 à 11
        const day = String(date.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        // Enregistrement de l'image dans la base de données
        req.body.image = {
            image_name: newFileName,
            image_date: formattedDate,
        } 

        req.body.res.status = 200
        req.body.res.message = "Image resized and saved"
        req.body.res.content = { file: { filename: newFileName } }
        
        setTimeout(() => {
            next()
        }, 2000); // Attendre 2 seconde avant de supprimer le fichier d'origine

        
    } catch (error) {
        console.log("jimpConfig -> error");
        console.log(error);
        res.status(500).json({ status: 500, message: "server problem, impossible to resize" })
    }
}

export default jimpConfig