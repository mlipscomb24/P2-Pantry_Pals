const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

class Item extends Model {}

Item.init(
  {
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    add_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    exp_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: 'id',
      },
    },
    status: {
      type: DataTypes.VIRTUAL,
      get() {
        const expDate = this.getDataValue('exp_date');
        const currentDate = new Date();
        const timeDiff = new Date(expDate) - currentDate;
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

        if (daysDiff < 0) {
          return 'has-background-danger';
        } else if (daysDiff < 3) {
          return 'has-background-warning';
        } else {
          return null;
        }
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'item',
  },
);

module.exports = Item;
