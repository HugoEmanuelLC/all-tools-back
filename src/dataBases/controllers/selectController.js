import UserAuth from "../models/userModel.js";
import MenusListe from "../models/menusModel.js";
import ProductsListe from "../models/productsModel.js";


export const getAllUsers = async (req, res) => {
    try {
        const users = await UserAuth.findAll();
        res.status(200).json({ status: 200, message: "Users retrieved successfully", data: users });
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ status: 500, message: "Error retrieving users", error });
    }
}


export const getAllMenus = async (req, res) => {
    try {
        const menus = await MenusListe.findAll();
        res.status(200).json({ status: 200, message: "Menus retrieved successfully", data: menus });
    } catch (error) {
        console.error("Error retrieving menus:", error);
        res.status(500).json({ status: 500, message: "Error retrieving menus", error });
    }
}


export const getAllProductsOfMenu = async (req, res) => {
    const menuId = req.params.menuId; // Assuming you pass the menu ID in the request parameters
    try {
        const products = await ProductsListe.findAll({
            where: { fk_menu: menuId } // Adjust the condition based on your database schema
        });
        res.status(200).json({ status: 200, message: "Products retrieved successfully", data: products });
    } catch (error) {
        console.error("Error retrieving products:", error);
        res.status(500).json({ status: 500, message: "Error retrieving products", error });
    }
}