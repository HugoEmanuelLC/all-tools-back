import MenusListe from "../models/menusModel.js";
import ProductsListe from "../models/productsModel.js";


export const createMenu = async (req, res) => {
    const { menu_name } = req.body; // Assuming you're sending menu_name in the request body

    try {
        const newMenu = await MenusListe.create({ menu_name, fk_auth: req.body.configDB.infosFromDB._id });
        res.status(201).json({ status: 201, message: "Menu created successfully", data: newMenu });
    } catch (error) {
        console.error("Error creating menu:", error);
        res.status(500).json({ status: 500, message: "Error creating menu", error });
    }
}


export const createProduct = async (req, res) => {
    const { product_name, product_price, product_description, fk_menu } = req.body; // Assuming you're sending these fields in the request body

    try {
        const newProduct = await ProductsListe.create({ product_name, product_price, product_description, fk_menu, fk_auth: req.body.configDB.infosFromDB._id });
        res.status(201).json({ status: 201, message: "Product created successfully", data: newProduct });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ status: 500, message: "Error creating product", error });
    }
}