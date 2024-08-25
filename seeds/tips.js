const { Tip } = require('../models');

const tipData = [
  {
    tip_id: 1,
    tip_content:
      'Keep high-ethylene fruits near each other (avocados, apples, peaches, melons, bananas, tomatoes, pears and plums) and away from ethylene-sensitive fruits and vegetables (greens, potatoes, carrots, mangos)',
  },
  {
    tip_id: 2,
    tip_content:
      'For herbs such as parsley and cilantro, wash and dry, then wrap in a towel and refridgerate.',
  },
  {
    tip_id: 3,
    tip_content:
      'Ripen citrus at room temperature and move to the refridgerator to slow ripening.',
  },
  {
    tip_id: 4,
    tip_content: 'Refridgerate corn in its husk to keep fresher longer.',
  },
  {
    tip_id: 5,
    tip_content: 'Refridgerate eggplant inside a paper bag to slow ripening.',
  },
  {
    tip_id: 6,
    tip_content:
      'Keep garlic and onions at room temperature but away from potatoes.',
  },
  {
    tip_id: 7,
    tip_content:
      'For leafy greens such as lettuces, spinach, chard, kale, collards: wash and dry, then wrap in a towel and refridgerate.',
  },
  {
    tip_id: 8,
    tip_content:
      'Store mushshrooms loosely in a paper bag in the refridgerator.',
  },
  {
    tip_id: 9,
    tip_content:
      'For pitted fruits such as peaches, plums, nectarines, apricots, cherries: ripen at room temperature and move to the refridgerator to slow ripening.',
  },
  {
    tip_id: 10,
    tip_content:
      'Pineapples and melons should be ripened at room temperature and moved to refridgerator to slow ripening.',
  },
  {
    tip_id: 11,
    tip_content:
      'Keep potatoes and winter squashes at room temperature but away from onions.',
  },
  {
    tip_id: 12,
    tip_content: 'Keep tomatoes at room temperature but away from potatoes.',
  },
  {
    tip_id: 13,
    tip_content:
      'Store avocados in a paper bag to speed ripening and store in the refridgerator to slow ripening.',
  },

  {
    tip_id: 14,
    tip_content: 'Store bananas at room temperature.',
  },

  {
    tip_id: 15,
    tip_content:
      'For carrots, beets, radishes, parsnips and turnips: cut the greens off before refridgerating or they will pull out moisture.',
  },

  {
    tip_id: 16,
    tip_content: 'Refridgerate celery still attached to its core.',
  },

  {
    tip_id: 17,
    tip_content:
      'Store guacamole or cut avocado with the avocado pit to slow browning.',
  },

  {
    tip_id: 18,
    tip_content:
      'Wrap the stem of a banana bunch with plastic wrap to slow the ripening process.',
  },

  {
    tip_id: 19,
    tip_content:
      'Keep apples in the refrigerator to maintain their crispness for longer.',
  },
  {
    tip_id: 20,
    tip_content:
      'Store cucumbers in the warmest part of the refrigerator to prevent them from getting water-soaked.',
  },

  {
    tip_id: 21,
    tip_content:
      'Keep berries unwashed in the refrigerator and only wash right before eating to prevent mold.',
  },
  {
    tip_id: 22,
    tip_content:
      'Wrap cheese in wax paper, then plastic wrap to prevent it from drying out.',
  },
  {
    tip_id: 23,
    tip_content:
      'Store asparagus like flowers: Trim the ends and stand them in a jar with water, then refrigerate.',
  },
  {
    tip_id: 24,
    tip_content:
      'Refrigerate fresh ginger in a paper bag to keep it fresh and  mold-free.',
  },
  {
    tip_id: 25,
    tip_content:
      'Store fresh basil in a glass of water on the counter and cover loosely with a plastic bag.',
  },
  {
    tip_id: 26,
    tip_content:
      'Keep bread in a cool, dry place in a bread box or wrapped in a    cloth to prevent it from going stale.',
  },
  {
    tip_id: 27,
    tip_content:
      'Freeze nuts and seeds to prevent them from going rancid,  especially in warm climates.',
  },
  {
    tip_id: 28,
    tip_content:
      'Store carrots in a container of water in the refrigerator to keep them crisp.',
  },
  {
    tip_id: 29,
    tip_content:
      'Keep strawberries in a single layer on a paper towel in a container in the fridge to extend their freshness.',
  },
  {
    tip_id: 30,
    tip_content:
      'Wrap celery in aluminum foil before refrigerating to keep it crisp.',
  },
  {
    tip_id: 31,
    tip_content:
      'Store bell peppers in the refrigerator’s crisper drawer to maintain their texture and flavor.',
  },
  {
    tip_id: 32,
    tip_content:
      'Refrigerate citrus fruits with the skins intact to extend their shelf life.',
  },
  {
    tip_id: 33,
    tip_content:
      'Keep cucumbers away from bananas and melons to avoid accelerated ripening.',
  },
  {
    tip_id: 34,
    tip_content:
      'Store green onions in a glass of water on the counter with the roots submerged to keep them fresh.',
  },
  {
    tip_id: 35,
    tip_content:
      'Place cut mushrooms in a paper towel-lined container to absorb excess moisture.',
  },
  {
    tip_id: 36,
    tip_content:
      'Store whole grain flours in the refrigerator or freezer to prevent them from spoiling.',
  },
  {
    tip_id: 37,
    tip_content:
      'Keep stone fruits stem-side down in a single layer at room temperature to ripen evenly.',
  },
  {
    tip_id: 38,
    tip_content: 'Store squash in a cool, dark place to extend its shelf life.',
  },
  {
    tip_id: 39,
    tip_content:
      'Keep watermelon whole and at room temperature until it’s ready to be cut.',
  },
  {
    tip_id: 40,
    tip_content:
      'Store cut potatoes in water in the refrigerator to prevent browning.',
  },
  {
    tip_id: 41,
    tip_content:
      'Keep grapes on their stems and refrigerate in a breathable bag or container.',
  },
  {
    tip_id: 42,
    tip_content:
      'Store zucchini in a perforated plastic bag in the refrigerator to maintain freshness.',
  },
  {
    tip_id: 43,
    tip_content:
      'Freeze herbs in olive oil in ice cube trays to preserve them for cooking.',
  },
  {
    tip_id: 44,
    tip_content:
      'Store eggplant at room temperature if it will be used within a day or two; otherwise, refrigerate.',
  },
  {
    tip_id: 45,
    tip_content:
      'Wrap cut cabbage tightly in plastic wrap to keep it from drying out in the refrigerator.',
  },
  {
    tip_id: 46,
    tip_content:
      'Keep garlic bulbs in a mesh bag in a cool, dry place for extended shelf life.',
  },
  {
    tip_id: 47,
    tip_content:
      'Store apples in a separate drawer in the refrigerator to prevent them from ripening other fruits.',
  },
  {
    tip_id: 48,
    tip_content:
      'Keep baking soda in the refrigerator to absorb odors and keep produce fresh.',
  },
  {
    tip_id: 49,
    tip_content:
      'Store pomegranates in the refrigerator to extend their shelf life.',
  },
  {
    tip_id: 50,
    tip_content:
      'Keep unopened olive oil in a cool, dark cupboard and use within a year of opening.',
  },
  {
    tip_id: 51,
    tip_content:
      'Store peeled garlic cloves in olive oil in the refrigerator for easy use in cooking.',
  },
  {
    tip_id: 52,
    tip_content:
      'Place a paper towel in bags of pre-washed greens to absorb moisture and keep them fresh.',
  },
  {
    tip_id: 53,
    tip_content:
      'Keep leeks wrapped in a paper towel and in a plastic bag in the refrigerator.',
  },
  {
    tip_id: 54,
    tip_content:
      'Store cooked grains in airtight containers in the refrigerator for up to five days.',
  },
  {
    tip_id: 55,
    tip_content:
      'Place a piece of bread in a bag of brown sugar to keep it soft and prevent clumping.',
  },
  {
    tip_id: 56,
    tip_content:
      'Store dry beans in airtight containers in a cool, dark place to extend their shelf life.',
  },
  {
    tip_id: 57,
    tip_content:
      'Wrap leftover citrus peels in plastic wrap and store them in the refrigerator for zesting later.',
  },
  {
    tip_id: 58,
    tip_content:
      'Keep pears at room temperature to ripen, then refrigerate to slow the ripening process.',
  },
  {
    tip_id: 59,
    tip_content:
      'Store celery root (celeriac) in a plastic bag in the refrigerator to prevent it from drying out.',
  },
  {
    tip_id: 60,
    tip_content:
      'Keep kiwis at room temperature until ripe, then refrigerate to slow ripening.',
  },
  {
    tip_id: 61,
    tip_content:
      'Store cherries in the coldest part of the refrigerator and avoid washing until ready to eat.',
  },
  {
    tip_id: 62,
    tip_content:
      'Refrigerate fresh turmeric root in a paper bag to keep it fresh for longer.',
  },
  {
    tip_id: 63,
    tip_content:
      'Wrap the cut side of a melon in plastic wrap and refrigerate to keep it fresh after cutting.',
  },
  {
    tip_id: 64,
    tip_content:
      'Store dried herbs in an airtight container in a cool, dark place to preserve their flavor.',
  },
  {
    tip_id: 65,
    tip_content:
      'Keep avocados in a bowl with lemons to slow the browning process after cutting.',
  },
  {
    tip_id: 66,
    tip_content:
      'Store whole heads of lettuce in a plastic bag with a paper towel to absorb excess moisture.',
  },
  {
    tip_id: 67,
    tip_content:
      'Freeze leftover tomato paste in spoonfuls on parchment paper, then transfer to a freezer bag for future use.',
  },
];

const seedTips = () => Tip.bulkCreate(tipData);
module.exports = seedTips;
