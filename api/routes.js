const rateLimit = require("express-rate-limit");
const {
  authMiddleware,
  requireAdminAccess,
} = require("../middlewares/requireAdminAccess");
const validateBody = require("../middlewares/validateBody");
const bookSchema = require("../schemas/book");
const { userSchema, userCreateSchema } = require("../schemas/user");

const limiters = {
  NONE: (req, res, next) => next(),
  ONE_SECOND: rateLimit({ windowMs: 1000, max: 1 }),
  FIVE_SECONDS: rateLimit({ windowMs: 5000, max: 1 }),
};

const bookRoutes = {
  v1: [
    {
      path: "books",
      method: "get",
      handler: require("./v1/books/get_books"),
      limiters: limiters.FIVE_SECONDS,
    },
    {
      path: "books/:id",
      method: "get",
      handler: require("./v1/books/get_book"),
      limiters: limiters.NONE,
    },
    {
      path: "books",
      method: "post",
      handler: require("./v1/books/post_book"),
      middlewares: [authMiddleware, validateBody(bookSchema)],
      limiters: limiters.NONE,
    },
    {
      path: "books/:id",
      method: "put",
      handler: require("./v1/books/put_book"),
      middlewares: [authMiddleware, validateBody(bookSchema)],
      limiters: limiters.NONE,
    },
    {
      path: "books/:id",
      method: "delete",
      handler: require("./v1/books/delete_book"),
      middlewares: [requireAdminAccess],
      limiters: limiters.NONE,
    },
    {
      path: "users",
      method: "get",
      handler: require("./v1/users/get_users"),
      limiters: limiters.FIVE_SECONDS,
    },
    {
      path: "auth/register",
      method: "post",
      middlewares: [validateBody(userCreateSchema)],
      handler: require("./v1/auth/register"),
    },
     {
      path: "users/:id",
      method: "delete",
      handler: require("./v1/users/deleteUser"),
      middlewares: [authMiddleware],
      limiters: limiters.NONE,
    },
     {
      path: "users/:id",
      method: "delete",
      handler: require("./v1/users/deleteUser"),
      middlewares: [requireAdminAccess],
      limiters: limiters.NONE,
    },
    {
      path: "auth/login",
      method: "post",
      middlewares: [validateBody(userSchema)],
      handler: require("./v1/auth/login"),
    },
    {
      path: "users/:id",
      method: "put",
      handler: require("./v1/users/put_user"),
      middlewares: [validateBody(userSchema)],
      limiters: limiters.NONE,
    },
  ],
};

module.exports = function (app) {
  for (const version in bookRoutes) {
    for (const route of bookRoutes[version]) {
      const middlewares = route.middlewares || [];
      console.log(
        `Registering route: ${route.method.toUpperCase()} /api/${version}/${
          route.path
        }`
      );

      const handlers = [];
      handlers.push(route.limiters || limiters.NONE);
      handlers.push(...middlewares);
      handlers.push(route.handler);

      app[route.method](`/api/${version}/${route.path}`, ...handlers);
    }
  }
};
