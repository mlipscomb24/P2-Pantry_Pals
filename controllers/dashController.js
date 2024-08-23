const router = require('express').Router();
const { Item } = require('../models');

// Helper function to convert icon names to emojis
const iconToEmoji = (iconName) => {
  const iconMap = {
    apple: '🍎',
    carrot: '🥕',
    pepper: '🌶️',
    fish: '🐟',
    cheese: '🧀',
    egg: '🥚',
    bread: '🍞',
    bacon: '🥓',
    pizza: '🍕',
    seedling: '🌱',
    cookie: '🍪',
    rice: '🍚',
    bottle: '🍶',
  };
  return iconMap[iconName] || iconName;
};

// GET route for the dashboard
router.get('/dashboard', async (req, res) => {
  if (req.session.logged_in) {
    try {
      const userId = req.session.user_id;
      const itemData = await Item.findAll({
        where: { user_id: userId },
        attributes: ['item', 'icon', 'exp_date'],
      });
      const items = itemData.map((item) => {
        const plainItem = item.get({ plain: true });
        plainItem.icon = iconToEmoji(plainItem.icon);
        return plainItem;
      });

      console.log('Retrieved items for dashboard:', items);
      console.log(req.session);
      res.render('dashboard', {
        items, // Pass items to the template
        logged_in: req.session.logged_in,
        username: req.session.user_name,
        email: req.session.email,
        created: req.session.created,
        logins: req.session.logins,
        last_login: req.session.last_login,
      });
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      res
        .status(500)
        .json({ error: 'Failed to load dashboard', details: err.message });
    }
  } else {
    res.redirect('/login');
  }
});

// POST route to add a new item
router.post('/api/stock', async (req, res) => {
  try {
    console.log('Received item data:', req.body);

    const newItem = await Item.create({
      item: req.body['item-name'],
      icon: req.body.icon,
      exp_date: req.body['expiration-date'],
      user_id: req.session.user_id,
    });

    console.log('Created new item:', newItem.toJSON());

    // Convert the icon to emoji before sending the response
    const responseItem = newItem.toJSON();
    responseItem.icon = iconToEmoji(responseItem.icon);

    req.session.save(() => {
      res.status(201).json(responseItem);
    });
  } catch (err) {
    console.error('Error creating item:', err);
    res.status(500).json({ error: 'Failed to add item', details: err.message });
  }
});

module.exports = router;
