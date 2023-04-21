import { DataTypes } from 'sequelize';
import database from '../database/index.js';

const Location = database.define('Location', {
  ubigeo: {
    type: DataTypes.STRING(6),
    primaryKey: true,
  },
  distrito: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  provincia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departamento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 6),
    allowNull: false,
  },
  longitude: {
    type: DataTypes.DECIMAL(10, 6),
    allowNull: false,
  },
}, {
  tableName: 'locations',
  timestamps: false,
});

export default Location;
