const { forwardTo } = require('prisma-binding');

const Query = {
  albums: forwardTo('db'),
  album: forwardTo('db')
};

module.exports = Query;
