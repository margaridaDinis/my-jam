const { forwardTo } = require('prisma-binding');

const Query = {
  albums: forwardTo('db'),
  album: forwardTo('db'),
  albumsConnection: forwardTo('db'),
  me(parent, args, context, info) {
    const { userId } = context.request;

    if (!userId) return null;

    return context.db.query.user({ where: { id: userId } }, info);
  },
};

module.exports = Query;
