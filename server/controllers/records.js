import { validationResults } from 'koa-req-validation';
import Record from '../models/record';
import ServerError from '../utils/server-error';

class RecordsControllers {
  /* eslint-disable no-param-reassign */

  /**
   * Find a record
   * @param {ctx} Koa Context
   */
  async findById(ctx) {
    try {
      const record = await Record.findById(ctx.params.id);
      if (!record) {
        throw new ServerError(404, 'Not Found');
      }
      ctx.body = record;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        throw new ServerError(404, err.reason, err.name);
      }
      throw new ServerError(500, err.reason, err.name);
    }
  }

  /**
   * Find a record
   * @param {ctx} Koa Context
   */
  async findByCriteria(ctx) {
    const result = validationResults(ctx);
    if (result.hasErrors()) {
      const errorKeys = Object.keys(result.mapped());
      throw new ServerError(422, result.mapped()[errorKeys[0]].msg);
    }
    try {
      const record = await Record.find({
        createdAt: { $gte: ctx.request.body.startDate, $lte: ctx.request.body.endDate },
        totalCount: { $gte: ctx.request.body.minCount, $lte: ctx.request.body.maxCount }
      }).select('key totalCount createdAt -_id');
      if (!record) {
        throw new ServerError(404, 'Not Found');
      }
      ctx.body = { code: 0, msg: 'Success', records: record };
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        throw new ServerError(404, err.reason, err.name);
      }
      throw new ServerError(500, err.reason, err.name);
    }
  }
  /* eslint-enable no-param-reassign */
}

export default new RecordsControllers();
