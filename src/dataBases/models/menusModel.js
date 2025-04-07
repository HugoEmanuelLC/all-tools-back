import { DataTypes } from 'sequelize';
import { sequelize } from '../dbConfigs/dbMySql.js';



// Model definition for MenusListe
const MenusListe = sequelize.define('MenusListe', {
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    menu_name: {
        type: DataTypes.STRING,
        allowNull: false,
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
    tableName: 'menus',
    timestamps: false, // Disable timestamps if not needed
});

export default MenusListe;