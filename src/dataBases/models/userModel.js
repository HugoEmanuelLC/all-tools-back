import { DataTypes } from 'sequelize';
import { sequelize } from '../dbConfigs/dbMySql.js';


// Model definition for User Authentication
const UserAuth = sequelize.define('UserAuth', {
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure email is unique
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'auth',
    timestamps: false, // Disable timestamps if not needed
});

export default UserAuth;