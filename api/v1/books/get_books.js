const db_books = require("../../../proxy/db_books");

module.exports = async (req, res) => {
  res.json(await db_books.getAll());
};

// const v1 = require('./v1/books/get_books');
// const v2 = require('./v2/books/get_books');

// module.exports = function(app, limiters) {
//   v1(app, limiters);
//   v2(app, limiters);
// };
//

// const bookRoutes = {
//   books: {
//     method: "get",
//     versions: [
//       {
//         version: "v1",
//         route: require("./v1/books/get_books"),
//         limiters: limiters.FIVE_SECONDS,
//       },
//       {
//         version: "v2",
//         route: require("./v2/books/get_books"),
//         limiters: limiters.ONE_SECOND,
//       },
//     ],
//   },
// };

// for (let route in bookRoutes) {
//   bookRoutes[route].versions.forEach((ver) => {
//     app[bookRoutes[route].method](
//       `/api/${ver.version}/${route}`,
//       ver.limiters,
//       ver.route
//     );
//   });
// }

// const bookRoutesSecondWay = {
//   'v1': {
//     books: {
//       method: "get",
//       route: require("./v1/books/get_books"),
//       limiters: limiters.FIVE_SECONDS,
//     },
//   },
//   'v2': {
//     books: {
//       method: "get",
//       route: require("./v2/books/get_books"),
//       limiters: limiters.ONE_SECOND,
//     },
//   },
// }

// for (let ver in bookRoutesSecondWay) {
//   for (let route in bookRoutesSecondWay[ver]) {
//     const routeInfo = bookRoutesSecondWay[ver][route];
//     app[routeInfo.method](
//       `/api/${ver}/${route}`,
//       routeInfo.limiters,
//       routeInfo.route
//     );
//   }
// }