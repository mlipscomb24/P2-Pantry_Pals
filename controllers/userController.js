const { User } = require('../models');

const userController = {
  signup: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      console.log('Attempting to create user:', { name, email }); // Don't log password
      const userData = await User.create({ name, email, password });

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.user_name = userData.name;
        req.session.logged_in = true;
        res.status(200).json({ user: userData, redirect: '/dashboard' });
      });
    } catch (err) {
      console.error('Signup error:', err);
      res
        .status(400)
        .json({ message: err.message || 'Failed to sign up', error: err });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userData = await User.findOne({ where: { email } });

      if (!userData) {
        res.status(400).json({ message: 'Incorrect email or password' });
        return;
      }

      const validPassword = await userData.checkPassword(password);

      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect email or password' });
        return;
      }

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        res.json({
          user: userData,
          message: 'You are now logged in!',
          redirect: '/dashboard',
        });
      });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  logout: (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(200).json({ message: 'Logged out successfully' });
      });
    } else {
      res.status(404).json({ message: 'No session found' });
    }
  },

  getDashboard: async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
      });

      if (!userData) {
        res.redirect('/login');
        return;
      }

      const user = userData.get({ plain: true });

      res.render('dashboard', {
        ...user,
        logged_in: true,
        totalItems: 0, // Placeholder for tbd Items model
        lastLogin: user.updatedAt ? user.updatedAt.toDateString() : 'N/A',
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
