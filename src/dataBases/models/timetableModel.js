import { DataTypes } from 'sequelize';
import { sequelize } from '../dbConfigs/dbMySql.js';


export const Timetable = sequelize.define('Timetable', {
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    day: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
}, {
    tableName: 'timetable',
    timestamps: false, // Disable timestamps if not needed
});