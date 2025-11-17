const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


module.exports = async function login(req, res) {
  const { email, password } = req.body;

//   const user = await db.getUserByEmail(email);
const user = { id: 1, email: "test", password: "test", role: "admin" };
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

//   const valid = await bcrypt.compare(password, user.password);
const valid = password === user.password;
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  res.json({ token });
};
