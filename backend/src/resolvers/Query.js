const { forwardTo } = require('prisma-binding');

const Query = {
  albums: forwardTo('db')
};

module.exports = Query;
