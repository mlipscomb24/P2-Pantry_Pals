const express = require('express');
const session = require('express-session');
const { engine } = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');
const sequelize = require('./config/connection'); // Make sure this path is correct
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars.js engine
app.engine('handlebars', engine());
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

<<<<<<< HEAD
app.listen(PORT, () =>
  console.log(`
Server running locally at http://localhost:${PORT} and on the web https://p2-expiration-help.onrender.com`),
);
=======
// Sync sequelize models to the database, then start the server
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`),
    );
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
>>>>>>> main
