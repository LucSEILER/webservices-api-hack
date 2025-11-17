const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
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
      return res.status(401).json({ message: "Invalid token" });
    }

    // console.log("Decoded token:", decoded);

    req.user = decoded;

    next();
  });
}

function requireAdminAccess(req, res, next) {
  authMiddleware(req, res, () => {
    if (req.user.isAdmin !== true) {
      return res.status(403).json({ message: "Forbidden: Admin only" });
    }
    next();
  });
}

module.exports = { authMiddleware, requireAdminAccess };