const router = require('express').Router();
const userController = require('./userController');

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/api/users/signup', userController.signup);
router.post('/api/users/login', userController.login);
router.post('/api/users/logout', userController.logout);

module.exports = router;
