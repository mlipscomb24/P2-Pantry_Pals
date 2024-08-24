const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tip extends Model {}

Tip.init(
  {
    tip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    tip_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tip',
  },
);

module.exports = Item;
