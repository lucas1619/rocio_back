import { DataTypes } from 'sequelize';
import database from '../database/index.js';
import Crop from './Crop.js';

const Devices  = database.define('Devices', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  device_type: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  crop_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Crops',
      key: 'id',
    },
    onDelete: 'CASCADE',
    allowNull: true
  },
}, {
  tableName: 'sensors', // nombre de la tabla en la base de datos
  timestamps: false,
});

Devices.belongsTo(Crop, { foreignKey: 'crop_id', as: 'crops' });

export default Devices;
