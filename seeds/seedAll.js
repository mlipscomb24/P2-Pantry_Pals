const sequelize = require('../config/connection');
const seedTips = require('./tips');

const seedAll = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synced and cleared');

    await seedTips();
    console.log('Tips seeded successfully');

    process.exit(0);
  } catch (err) {
    console.error('Failed to seed database:', err);
    process.exit(1);
  }
};

seedAll();
