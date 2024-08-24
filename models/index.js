const User = require('./User');
const Item = require('./Item');
const Tip = require('./Tip');

User.hasMany(Item, {
  foreignKey: 'id',
  onDelete: 'CASCADE',
});

Item.belongsTo(User, {
  foreignKey: 'id',
});

module.exports = { User, Item, Tip };
