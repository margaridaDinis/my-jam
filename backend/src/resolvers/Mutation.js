const bcrypt = require('bcryptjs');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, makeANiceEmail } = require('../mail');
const { setToken, canPerformMutation, isAlbumOwner } = require('../utils');
const {
  userEditPermissions,
  userAlbumCreatePermissions,
  userAlbumDeletePermissions,
  userAlbumUpdatePermissions,
} = require('../permissions');

const mutations = {
  createAlbum(parent, args, ctx, info) {
    canPerformMutation(ctx.request, userAlbumCreatePermissions);

    return ctx.db.mutation.createAlbum({
      data: {
        user: {
          connect: {
            id: ctx.request.userId,
          },
        },
        ...args,
      },
    }, info);
  },
  async updateAlbum(parent, args, ctx, info) {
    canPerformMutation(ctx.request, userAlbumUpdatePermissions);
    await isAlbumOwner({ albumId: args.id, ctx });

    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updateAlbum({
      data: updates,
      where: {
        id: args.id,
      },
    }, info);
  },
  async deleteAlbum(parent, args, ctx, info) {
    canPerformMutation(ctx.request, userAlbumDeletePermissions);
    await isAlbumOwner({ albumId: args.id, ctx });

    return ctx.db.mutation.deleteAlbum({ where: { id: args.id } }, info);
  },
  async signUp(parent, args, ctx, info) {
    const data = [...args];
    data.email = data.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...data,
          password,
          permissions: { set: ['USER'] },
        },
      },
      info,
    );

    setToken({ ctx, userId: user.id });

    return user;
  },
  async signIn(parent, { email, password }, ctx) {
    const user = await ctx.db.query.user({ where: { email } });

    if (!user) throw new Error(`No such user found for email: ${email}`);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid password');

    setToken({ ctx, userId: user.id });

    return user;
  },
  async signOut(parent, args, ctx) {
    ctx.response.clearCookie('token');
    return { message: 'Signed out' };
  },
  async requestReset(parent, { email }, ctx) {
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) throw new Error(`No such user found for email: ${email}`);

    const promisifiedRandomBytes = promisify(randomBytes);
    const resetToken = (await promisifiedRandomBytes(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    await ctx.db.mutation.updateUser({
      where: { email },
      data: { resetToken, resetTokenExpiry },
    });

    await transport.sendMail({
      from: 'margarida@margaridadinis.com',
      to: user.email,
      subject: 'MyJam password reset request',
      html: makeANiceEmail(`A password reset was recently requested for this email address.
        \n\n
        <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">
        Click here to set a new password for your MyJam account.
        </a>`),
    });

    return { message: 'Success! Check your email for a reset link!' };
  },
  async resetPassword(parent, args, ctx, info) {
    const { resetToken, password, confirmPassword } = args;

    if (password !== confirmPassword) throw new Error('Password and confirmation do not match');

    const [user] = await ctx.db.query.users({
      where: {
        resetToken, resetTokenExpiry_gte: Date.now() - 3600000,
      },
    });

    if (!user) throw new Error('The reset token is not valid');

    const newPassword = await bcrypt.hash(password, 10);

    const updatedUser = await ctx.db.mutation.updateUser(
      {
        where: { email: user.email },
        data: {
          password: newPassword,
          resetToken: '',
          resetTokenExpiry: '',
        },
      },
      info,
    );

    setToken({ ctx, userId: updatedUser.id });

    return updatedUser;
  },
  updatePermissions(parent, { permissions, userId }, ctx, info) {
    canPerformMutation(ctx.request, userEditPermissions);

    return ctx.db.mutation.updateUser(
      {
        where: { id: userId },
        data: {
          permissions: {
            set: permissions,
          },
        },
      },
      info,
    );
  },
};

module.exports = mutations;
