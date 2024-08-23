const router = require('express').Router();
const { User } = require('../models');

router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await User.findAll({
      attributes: ['id', 'name', 'power'],
      order: [['power', 'DESC']],
    });
    leaderboard.forEach((user, index) => {
      user.dataValues.rank = index + 1;
    });
    res.render('leaderboard', {
      leaderboard,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    res
      .status(500)
      .json({ error: 'Failed to load dashboard', details: err.message });
  }
});

module.exports = router;
