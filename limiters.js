const rateLimit = require("express-rate-limit");

export const limiters = {
  ONE_SECOND: rateLimit({
    windowMs: 1000,
    max: 1,
  }),
  FIVE_SECONDS: rateLimit({
    windowMs: 5000,
    max: 1,
  }),
};
