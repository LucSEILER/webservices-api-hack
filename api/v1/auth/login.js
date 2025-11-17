const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db_users = require("../../../proxy/db_users");

module.exports = async function login(req, res) {
  const { username, password } = req.body;

  const user = await db_users.getByUsername(username);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  //   const valid = await bcrypt.compare(password, user.password);
  const valid = password === user.password;
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const tokenPayload = {
    id: user.id,
    username: user.username,
    isAdmin: user.isAdmin === true,
  };

  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  res.json({ token });
};