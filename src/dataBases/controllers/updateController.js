import MenusListe from "../models/menusModel.js";
import ProductsListe from "../models/productsModel.js";


export const updateMenu = async (req, res) => {
    const menuId = req.params.menuId; // Assuming you pass the menu ID in the request parameters
    const { menu_name } = req.body; // Assuming you're sending menu_name in the request body

    try {
        const [updatedRows] = await MenusListe.update({ menu_name }, { where: { _id: menuId } });
        if (updatedRows === 0) {
            return res.status(404).json({ status: 404, message: "Menu not found" });
        }
        res.status(200).json({ status: 200, message: "Menu updated successfully" });
    } catch (error) {
        console.error("Error updating menu:", error);
        res.status(500).json({ status: 500, message: "Error updating menu", error });
    }
}


export const updateProduct = async (req, res) => {
    const productId = req.params.productId; // Assuming you pass the product ID in the request parameters
    const { product_name, product_price, product_description } = req.body; // Assuming you're sending these fields in the request body

    try {
        const [updatedRows] = await ProductsListe.update({ product_name, product_price, product_description }, { where: { _id: productId } });
        if (updatedRows === 0) {
            return res.status(404).json({ status: 404, message: "Product not found" });
        }
        res.status(200).json({ status: 200, message: "Product updated successfully" });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ status: 500, message: "Error updating product", error });
    }
}