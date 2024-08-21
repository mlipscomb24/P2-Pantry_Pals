const router = require('express').Router();
const { Item } = require('../models');

router.get('/', async (req, res) => {
  try {
    const itemData = await Item.findAll({
      attributes: ['icon', 'item', 'date'],
    });

    const items = itemData.map((item) => item.get({ plain: true }));
    res.render('dashboard', {
      items,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
