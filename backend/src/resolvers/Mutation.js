const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const setToken = ({ ctx, userId }) => {
  const token = jwt.sign({ userId }, process.env.APP_SECRET);

  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
  });
};

const mutations = {
  createAlbum(parent, args, ctx, info) {
    return ctx.db.mutation.createAlbum({
      data: { ...args }
    }, info);
  },
  updateAlbum(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updateAlbum({
      data: updates,
      where: {
        id: args.id
      }
    }, info);
  },
  async deleteAlbum(parent, args, ctx, info) {
    const where = { id: args.id };
    const item = await ctx.db.query.album({ where }, `{ id name }`);

    return ctx.db.mutation.deleteAlbum({ where }, info);
  },
  async signUp(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] },
        },
      },
      info
    );

    setToken({ ctx, userId: user.id });

    return user;
  },
  async signIn(parent, { email, password }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email } });

    if (!user) throw new Error(`No such user found for email: ${email}`);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid password');

    setToken({ ctx, userId: user.id });

    return user;
  }
};

module.exports = mutations;
