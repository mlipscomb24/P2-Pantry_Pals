const router = require('express').Router();
const { User } = require('../models');

router.get('/leaderboard', async (req, res) => {
  console.log('Leaderboard accessed.');
  try {
    console.log('Fetching Users');
    const leaderboardData = await User.findAll({
      attributes: ['id', 'name', 'power'],
      order: [['power', 'DESC']],
    });
    console.log('Iterating over User list assigning ranks.');
    const leaderboard = leaderboardData.map((user, index) => {
      const userObj = user.get({ plain: true });
      userObj.rank = index + 1;
      return userObj;
    });
    console.log('Rendering leaderboard page.');
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
