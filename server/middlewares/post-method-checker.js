import ServerError from "../utils/server-error";

export default async (ctx, next) => {
  if (ctx.request.req.method === 'POST' || ctx.request.req.method === 'OPTIONS') {
    await next();
  } else {
    throw new ServerError(405, 'Not Allowed Method', 'Method Error')
  }
};
