import { DataTypes } from 'sequelize';
import database from '../database/index.js';
import Field from './Field.js';

const Crop  = database.define('Field', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  crop_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  soil_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  growth_stage: {
    type: DataTypes.STRING,
    allowNull: false
  },
  irrigation_frequency: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  field_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Fields',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'crops', // nombre de la tabla en la base de datos
  timestamps: false,
});

Crop.belongsTo(Field, { foreignKey: 'field_id', as: 'fields' });

export default Crop;
