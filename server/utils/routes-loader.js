import glob from 'glob';

/**
 * Read routes from files on given directory and return them as a Promise
 * @param dirname
 * @returns {Promise<routes>}
 */
export default function (dirname) {
  return new Promise((resolve, reject) => {
    const routes = [];
    glob(
      `${dirname}/*`,
      {
        ignore: '**/index.js'
      },
      (err, files) => {
        if (err) {
          return reject(err);
        }
        files.forEach((file) => {
          const route = require(file); // eslint-disable-line global-require, import/no-dynamic-require
          routes.push(route);
        });
        return resolve(routes);
      }
    );
  });
}
