const router = require('express').Router();
const { Item } = require('../models');

// Helper function to convert icon names to emojis
const iconToEmoji = (iconName) => {
  const iconMap = {
    apple: '🍎',
    banana: '🍌',
    orange: '🍊',
    grapes: '🍇',
    kiwi: '🥝',
    peach: '🍑',
    berry: '🫐',
    watermelon: '🍉',
    lemon: '🍋',
    melon: '🍈',
    pineapple: '🍍',
    strawberry: '🍓',
    mango: '🥭',
    avocado: '🥑',
    carrot: '🥕',
    pepper: '🌶️',
    eggplant: '🍆',
    tomato: '🍅',
    corn: '🌽 ',
    broccoli: '🥦',
    leafygreen: '🥬',
    fish: '🐟',
    shrimp: '🍤',
    cheese: '🧀',
    milk: '🥛',
    steak: '🥩',
    chicken: '🍗',
    egg: '🥚',
    bread: '🍞',
    bacon: '🥓',
    pizza: '🍕',
    seedling: '🌱',
    cookie: '🍪',
    rice: '🍚',
    bottle: '🍶',
    juice: '🧃',
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
      res.redirect('/dashboard');
    });
  } catch (err) {
    console.error('Error creating item:', err);
    res.status(500).json({ error: 'Failed to add item', details: err.message });
  }
});

module.exports = router;

// DELETE route
router.delete('/api/stock', async (req, res) => {
  // delete item by its id
  
  try {
  const allItems = await Item.destroy ({
    where: {
    item_id: req.params.id,
  }, 
  }); 
  
  if (!allItems) {
    res.status(404).json({ message: 'That id is not associated with an item' }); 
    return;
  }
    res.status(200).json(allItems);
    } catch (err) {
    console.log(err); 
    res.status(500).json(err); 
  }
  });
  
  module.exports = router
