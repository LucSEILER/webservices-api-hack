module.exports = (schema) => {
  return (req, res, next) => {
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ message: "Invalid or missing JSON body" });
    }

    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({ message: "Invalid request body", details: error.details.map(d => d.message) });
    }

    req.body = value;
    next();
  };
};
