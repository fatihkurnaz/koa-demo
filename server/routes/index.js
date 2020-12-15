import routesLoader from '../utils/routes-loader';

/**
 *  Take routes from loader and register them into app
 * @param app
 */
export default function (app) {
  routesLoader(`${__dirname}`).then((files) => {
    files.forEach((route) => {
      app.use(route.routes()).use(
        route.allowedMethods({
          throw: true
        })
      );
    });
  });
}
