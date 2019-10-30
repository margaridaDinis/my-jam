const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, makeANiceEmail } = require('../mail');
const { hasPermission, userEditPermissions } = require('../utils');

const setToken = ({ ctx, userId }) => {
  const token = jwt.sign({ userId }, process.env.APP_SECRET);

  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
  });
};

const mutations = {
  createAlbum(parent, args, ctx, info) {
    const { userId } =  ctx.request;

    if (!userId) {
      throw new Error('You must be logged in to add albums');
    }

    return ctx.db.mutation.createAlbum({
      data: {
        user: {
          connect: {
            id: userId
          }
        },
        ...args
      }
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
  },
  async signOut(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'Signed out' };
  },
  async requestReset(parent, { email }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) throw new Error(`No such user found for email: ${email}`);

    const promisifiedRandomBytes = promisify(randomBytes);
    const resetToken = (await promisifiedRandomBytes(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    await ctx.db.mutation.updateUser({
      where: { email },
      data: { resetToken, resetTokenExpiry }
    });

    await transport.sendMail({
      from: 'margarida@margaridadinis.com',
      to: user.email,
      subject: 'MyJam password reset request',
      html: makeANiceEmail(`A password reset was recently requested for this email address.
        \n\n
        <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">
        Click here to set a new password for your MyJam account.
        </a>`)
    });

    return { message: 'Success! Check your email for a reset link!' };
  },
  async resetPassword(parent, args, ctx, info) {
    const { resetToken, password, confirmPassword } = args;

    if (password !== confirmPassword) throw new Error('Password and confirmation do not match');

    const [user] = await ctx.db.query.users({
      where: {
        resetToken, resetTokenExpiry_gte: Date.now() - 3600000
      }
    });

    if (!user) throw new Error('The reset token is not valid');

    const newPassword = await bcrypt.hash(password, 10);

    const updatedUser = await ctx.db.mutation.updateUser(
      {
        where: { email: user.email },
        data: {
          password: newPassword,
          resetToken: '',
          resetTokenExpiry: ''
        },
      },
      info
    );

    setToken({ ctx, userId: updatedUser.id });

    return updatedUser;
  },
  async updatePermissions(parent, { permissions, userId }, ctx, info) {
    if (!ctx.request.userId) throw new Error(`No user found!`);

    hasPermission(ctx.request.user, userEditPermissions);

    return ctx.db.mutation.updateUser(
      {
        where: { id: userId },
        data: {
          permissions: {
            set: permissions
          }
        },
      },
      info
    );
  }
};

module.exports = mutations;
