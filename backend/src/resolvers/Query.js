const { forwardTo } = require('prisma-binding');

const Query = {
  albums: forwardTo('db'),
  album: forwardTo('db'),
  albumsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    const { userId } = ctx.request;

    if (!userId) return null;

    return ctx.db.query.user({ where: { id: userId } }, info);
  },
};

module.exports = Query;
