const getItemsToDisconnect = async ({ args, model, ctx }) => {
  const connected = await ctx.db.query[model]({ where: { albums_some: { id: args.id } } });

  return connected.map((m) => ({ id: m.id })).filter((m) => !args[model].includes(m.id));
};

const getItemsToConnect = (items) => items.map((id) => ({ id }));

exports.getItemsToDisconnect = getItemsToDisconnect;
exports.getItemsToConnect = getItemsToConnect;
