const router = require('express').Router();
const userController = require('./userController');

// Middleware to check if user is logged in
const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

router.get('/', (req, res) => {
  res.render('home', {
    logged_in: req.session.logged_in,
  });
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup', {
    logged_in: false,
  });
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login', {
    logged_in: false,
  });
});

router.get('/dashboard', withAuth, userController.getDashboard);


if (userController.signup) {
  router.post('/api/users/signup', userController.signup);
}

if (userController.login) {
  router.post('/api/users/login', userController.login);
}

if (userController.logout) {
  router.post('/api/users/logout', userController.logout);
} else {
  console.error('Logout method is not defined in userController');
}

// Add a GET route for logout
router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
