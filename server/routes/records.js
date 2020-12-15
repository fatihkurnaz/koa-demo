import Router from 'koa-router';
import { body } from 'koa-req-validation';
import { baseApi } from '../config';

import RecordsControllers from '../controllers/records';

const api = 'records';

const router = new Router();

router.prefix(`/${baseApi}/${api}`);

// Post /api/records
router.post(
  '/',
  body('minCount').isNumeric().withMessage('The minCount should be sent').build(),
  body('maxCount').isNumeric().withMessage('The maxCount should be sent').build(),
  body('startDate').isISO8601().withMessage('The startDate has to be YYYY-MM-DD format').build(),
  body('endDate').isISO8601().withMessage('The endDate has to be YYYY-MM-DD format').build(),
  RecordsControllers.findByCriteria
);

// Post /api/records/id
router.post('/:id', RecordsControllers.findById);

export default router;
