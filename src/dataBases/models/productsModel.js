import { DataTypes } from 'sequelize';
import { sequelize } from '../dbConfigs/sequelizeMySql.js';



// Model definition for ProductsListe
// Assuming ProductsListe has a foreign key fk_menu that references MenusListe
const ProductsListe = sequelize.define('ProductsListe', {
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    product_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    product_description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    fk_menu: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'MenusListe', // Name of the referenced model
            key: '_id', // Key in the referenced model
        },
    },
    fk_auth: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'UserAuth', // Name of the referenced model
            key: '_id', // Key in the referenced model
        },
    },
}, {
    tableName: 'products',
    timestamps: false, // Disable timestamps if not needed
});

export default ProductsListe;