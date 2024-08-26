const { User } = require('../models');

const leaderboardData = [
  {
    name: 'GeeWillikers55',
    email: 'gw@gw.com',
    power: 819780,
    password: 'password12345',
    created: '2017-01-06',
  },
  {
    name: 'GroceryGod888',
    email: 'gg@gg.com',
    power: 723890,
    password: 'password12345',
    created: '2008-03-15',
  },
  {
    name: 'ILoveSausage77',
    email: 'ils@ils.com',
    power: 718090,
    password: 'password12345',
    created: '2005-06-05',
  },
  {
    name: 'HerbalRemedy111',
    email: 'hr@hr.com',
    power: 678263,
    password: 'password12345',
    created: '2012-10-05',
  },
  {
    name: 'CrankyGrandma89',
    email: 'cg@cg.com',
    power: 669780,
    password: 'password12345',
    created: '2005-07-27',
  },
  {
    name: 'danielHungry123',
    email: 'dh@dh.com',
    power: 653900,
    password: 'password12345',
    created: '2012-05-17',
  },
  {
    name: 'SwollenNaggyDaddy7365',
    email: 'sd@sd.com',
    power: 572050,
    password: 'password12345',
    created: '2020-05-11',
  },
  {
    name: 'xXGUnitThugXx',
    email: 'xgut@xgut.com',
    power: 480920,
    password: 'password12345',
    created: '2007-04-23',
  },
  {
    name: 'CouponCarol33',
    email: 'cc@cc.com',
    power: 340290,
    password: 'password12345',
    created: '2018-03-08',
  },
  {
    name: 'GoodEatsGary99',
    email: 'geg@geg.com',
    power: 200140,
    password: 'password12345',
    created: '2020-12-18',
  },
  {
    name: 'GunsBlazin12',
    email: 'gb@gb.com',
    power: 198060,
    password: 'password12345',
    created: '2017-04-05',
  },
  {
    name: 'EBTGoddess456',
    email: 'ebtg@ebtg.com',
    power: 178020,
    password: 'password12345',
    created: '2024-01-14',
  },
  {
    name: 'IvoryTickler100',
    email: 'it@it.com',
    power: 155040,
    password: 'password12345',
    created: '2015-09-09',
  },

  {
    name: 'CardShark007',
    email: 'cs@cs.com',
    power: 148090,
    password: 'password12345',
    created: '2019-03-01',
  },

  {
    name: 'FroggyG77',
    email: 'fg@fg.com',
    power: 139020,
    password: 'password12345',
    created: '2018-12-01',
  },

  {
    name: 'IEatAsparagus90',
    email: 'iea@iea.com',
    power: 124900,
    password: 'password12345',
    created: '2020-06-24',
  },

  {
    name: 'BeachBum29',
    email: 'bb@bb.com',
    power: 110920,
    password: 'password12345',
    created: '2022-03-20',
  },

  {
    name: 'DragonOfChaos666',
    email: 'doc@doc.com',
    power: 98060,
    password: 'password12345',
    created: '2008-07-07',
  },

  {
    name: 'PatrioticPapa1776',
    email: 'patp@pat.com',
    power: 88090,
    password: 'password12345',
    created: '2024-05-15',
  },
  {
    name: 'FredTheFoodie56',
    email: 'ftf@ftf.com',
    power: 78020,
    password: 'password12345',
    created: '2005-03-24',
  },

  {
    name: 'MustardontheBeetz90',
    email: 'motb@motb.com',
    power: 66320,
    password: 'password12345',
    created: '2011-03-29',
  },
  {
    name: 'SavorySandrax13',
    email: 'savsan@savsan.com',
    power: 58020,
    password: 'password12345',
    created: '2006-12-20',
  },
  {
    name: 'AllenLebowitz',
    email: 'allenlebowitz@me.com',
    power: 30500,
    password: 'password12345',
    created: '1978-06-18',
  },
  {
    name: 'BigMamaTay01',
    email: 'bmt@bmt.com',
    power: 19780,
    password: 'password12345',
    created: '2009-11-16',
  },
  {
    name: 'HarleyFan555s',
    email: 'hf@hf.com',
    power: 470,
    password: 'password12345',
    created: '2017-03-27',
  },
];

const seedLeaderboard = () => User.bulkCreate(leaderboardData);
module.exports = seedLeaderboard;
