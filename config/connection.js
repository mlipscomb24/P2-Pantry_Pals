const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;
// Web sequelize for render deployment
if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthrozied: false,
      },
    },
  });
} else {
  // Local sequlize for render deployment
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      port: process.env.DB_PORT || 5432,
    },
  );
}
module.exports = sequelize;
