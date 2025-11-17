const jwt = require("jsonwebtoken");

function requireAdminAccess(req, res, next) {
  console.log("Require admin access middleware");

  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized !" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized !" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized !" });
    }
    next();
  });
}

module.exports = requireAdminAccess;
