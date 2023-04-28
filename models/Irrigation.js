import { DataTypes } from 'sequelize';
import database from '../database/index.js';
import Crop from './Crop.js';

const Irrigation  = database.define('Irrigation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  crop_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Crops',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'irrigation', // nombre de la tabla en la base de datos
  timestamps: false,
});

Irrigation.belongsTo(Crop, { foreignKey: 'crop_id', as: 'crops' });

export default Irrigation;
