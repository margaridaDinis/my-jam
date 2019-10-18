const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mutations = {
  createAlbum(parent, args, context, info) {
    return context.db.mutation.createAlbum({
      data: { ...args }
    }, info);
  },
  updateAlbum(parent, args, context, info) {
    const updates = { ...args };
    delete updates.id;
    return context.db.mutation.updateAlbum({
      data: updates,
      where: {
        id: args.id
      }
    }, info);
  },
  async deleteAlbum(parent, args, context, info) {
    const where = { id: args.id };
    const item = await context.db.query.album({ where }, `{ id name }`);

    return context.db.mutation.deleteAlbum({ where }, info);
  },
  async signUp(parent, args, context, info) {
    args.email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] },
        },
      },
      info
    );
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    context.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    });
    return user;
  },
};

module.exports = mutations;
