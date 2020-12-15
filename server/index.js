import bodyParser from 'koa-bodyparser';
import Koa from 'koa';
import logger from 'koa-logger';
import mongoose from 'mongoose';
import helmet from 'koa-helmet';
import routing from './routes';
import { PORT, MONGO_URL } from './config';
import postMethodChecker from './middlewares/post-method-checker';
import errorHandler from './middlewares/error-handler';

// Create Koa Application
const app = new Koa();

// middlewares
app.use(errorHandler);
app.use(logger()).use(bodyParser()).use(helmet()).use(postMethodChecker);
routing(app);

// Start the application
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`✅  The server is running at http://localhost:${PORT}/`));
  })
  .catch((err) => {
    console.log(err);
  });

export default app;
