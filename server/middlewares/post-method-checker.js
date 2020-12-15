import ServerError from "../utils/server-error";

/**
 * Check request method and blocks method which is not POST and OPTIONS
 * @param ctx Koa Context
 * @param next
 * @returns {Promise<void>}
 */
export default async (ctx, next) => {
  if (ctx.request.req.method === 'POST' || ctx.request.req.method === 'OPTIONS') {
    await next();
  } else {
    throw new ServerError(405, 'Not Allowed Method', 'Method Error')
  }
};
