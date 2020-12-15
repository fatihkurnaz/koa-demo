import routesLoader from '../utils/routes-loader';

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
