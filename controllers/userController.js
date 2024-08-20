const { User } = require('../models');

const userController = {
  signup: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const userData = await User.create({ name, email, password });

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
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
        res.json({ user: userData, message: 'You are now logged in!' });
      });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  logout: (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  },
};

module.exports = userController;
