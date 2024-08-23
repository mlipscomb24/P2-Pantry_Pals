const express = require('express');
const session = require('express-session');
const { engine } = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');
const sequelize = require('./config/connection');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars.js engine with custom helpers
app.engine(
  'handlebars',
  engine({
    helpers: {
      formatDate: function (date) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
      },
    },
  }),
);

app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_fallback_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

app.use(routes);

// Sync sequelize models to the database, then start the server
sequelize
  // alter: true attempts to alter tables to match models without dropping them,
  // force: true would drop the tables completely fyi
  .sync({ alter: true, force: false })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`
      Server running locally at http://localhost:${PORT} and on the web https://p2-expiration-help.onrender.com`),
    );
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
