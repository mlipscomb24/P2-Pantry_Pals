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
      const userId = req.session.id;
      const itemData = await Item.findAll({
      attributes: ['item', 'icon', 'date'],
    });
    const items = itemData.map((item) => {
      const plainItem = item.get({ plain: true });
      plainItem.icon = iconToEmoji(plainItem.icon);
      return plainItem;
    });

    console.log('Retrieved items for dashboard:', items);

    res.render('dashboard', {
      items, // Pass items to the template
      logged_in: req.session.logged_in,
      username: req.session.username,
      email: req.session.email,
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
      date: req.body['expiration-date'],
    });

    console.log('Created new item:', newItem.toJSON());

    // Convert the icon to emoji before sending the response
    const responseItem = newItem.toJSON();
    responseItem.icon = iconToEmoji(responseItem.icon);

    res.status(201).json(responseItem);
  } catch (err) {
    console.error('Error creating item:', err);
    res.status(500).json({ error: 'Failed to add item', details: err.message });
  }
});

module.exports = router;
