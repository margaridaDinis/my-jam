const { forwardTo } = require('prisma-binding');

const Query = {
  albuns: forwardTo('db')
};

module.exports = Query;
