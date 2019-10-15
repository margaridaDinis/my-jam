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
  }
};

module.exports = mutations;
