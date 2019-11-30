const { forwardTo } = require('prisma-binding');
const { hasPermission, userEditPermissions } = require('../permissions');

const Query = {
  albums: forwardTo('db'),
  album: forwardTo('db'),
  albumsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    const { userId } = ctx.request;

    if (!userId) return null;

    return ctx.db.query.user({ where: { id: userId } }, info);
  },
  async users(parent, args, ctx, info) {
    const { user, userId } = ctx.request;

    if (!userId) throw new Error('You are not logged in.');

    hasPermission(user, userEditPermissions);

    return ctx.db.query.users({}, info);
  },
  genres: forwardTo('db'),
  genre: forwardTo('db'),
  artists: forwardTo('db'),
  artist: forwardTo('db'),
};

module.exports = Query;
