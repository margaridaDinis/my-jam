const jwt = require('jsonwebtoken');
const { hasPermission } = require('./permissions');

const setToken = ({ ctx, userId }) => {
  const token = jwt.sign({ userId }, process.env.APP_SECRET);

  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
  });
};

const canPerformMutation = (request, requiredPermissions) => {
  const { userId, user } = request;

  if (!userId) {
    throw new Error('You must be logged to do this.');
  }

  if (requiredPermissions) hasPermission(user, requiredPermissions);
};

const isAlbumOwner = async ({ ctx, albumId }) => {
  const album = await ctx.db.query.album({ where: { id: albumId } }, '{ id name user { id } }');

  if (album.user.id !== ctx.request.userId) throw new Error('You can only change items you created');
};

exports.setToken = setToken;
exports.canPerformMutation = canPerformMutation;
exports.isAlbumOwner = isAlbumOwner;
