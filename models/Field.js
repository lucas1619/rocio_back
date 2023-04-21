import { DataTypes } from 'sequelize';
import database from '../database/index.js';
import Location from './Location.js';

const Field = database.define('Field', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  area: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  location_id: {
    type: DataTypes.STRING(6),
    references: {
      model: 'location',
      key: 'ubigeo',
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'fields', // nombre de la tabla en la base de datos
  timestamps: false,
});

Field.belongsTo(Location, { foreignKey: 'location_id', as: 'location' });

export default Field;
