export default async (ctx, next) => {
  return next().catch((err) => {
    const { statusCode, message, code } = err;

    ctx.type = 'json';
    ctx.status = statusCode || 500;
    ctx.body = {
      code,
      msg: message
    };

    ctx.app.emit('error', err, ctx);
  });
};
