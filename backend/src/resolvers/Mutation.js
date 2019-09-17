const mutations = {
  createAlbum(parent, args, context, info) {
    return context.db.mutation.createAlbum({
      data: { ...args }
    }, info);
  }
};

module.exports = mutations;
