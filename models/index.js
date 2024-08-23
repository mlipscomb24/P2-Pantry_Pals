const User = require('./User');
const Item = require('./Item');

User.hasMany(Item, {
  foreignKey: 'id',
  onDelete: 'CASCADE',
});

Item.belongsTo(User, {
  foreignKey: 'id',
});

module.exports = { User, Item };
