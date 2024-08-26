const router = require('express').Router();
const { Item, Tip, User } = require('../models');

const currentDate = new Date();

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
        attributes: ['item_id', 'item', 'icon', 'exp_date', 'status'],
      });
      const items = itemData.map((item) => {
        const plainItem = item.get({ plain: true });
        plainItem.icon = iconToEmoji(plainItem.icon);
        return plainItem;
      });

      const tipId = Math.floor(Math.random() * 67) + 1;
      const randomTip = await Tip.findByPk(tipId);
      const tipContent = randomTip.get({ plain: true });
      const tip = tipContent.tip_content;

      console.log('Retrieved items for dashboard:', items);
      console.log(req.session);
      res.render('dashboard', {
        tip,
        items, // Pass items to the template
        logged_in: req.session.logged_in,
        username: req.session.user_name,
        email: req.session.email,
        created: req.session.created,
        logins: req.session.logins,
        last_login: req.session.last_login,
        power: req.session.power,
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
      add_date: currentDate,
      exp_date: req.body['expiration-date'],
      user_id: req.session.user_id,
    });

    console.log('Created new item:', newItem.toJSON());

    const user = await User.findByPk(req.session.user_id);

    if (user) {
      console.log('Awarding points.');
      user.power += 10;
      await user.save();
    }

    // Convert the icon to emoji before sending the response
    const responseItem = newItem.toJSON();
    responseItem.icon = iconToEmoji(responseItem.icon);
    responseItem.status = newItem.status;

    req.session.save(() => {
      res.status(201).json(responseItem);
    });
  } catch (err) {
    console.error('Error creating item:', err);
    res.status(500).json({ error: 'Failed to add item', details: err.message });
  }
});

module.exports = router;

// DELETE route
router.delete('/api/stock/:id', async (req, res) => {
  // delete item by its id

  try {
    const item = await Item.findByPk(req.params.id);

    if (!item) {
      res
        .status(404)
        .json({ message: 'That id is not associated with an item' });
      return;
    }
    const userId = item.user_id;

    await item.destroy();

    const user = await User.findByPk(userId);

    if (user) {
      console.log('Awarding points.');
      user.power += 10;
      await user.save();
    }

    res.status(200).json({ message: 'Item deleted and points updated', user });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
