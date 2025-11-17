const db_users = require("../../../proxy/db_users");

module.exports = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const user = await db_users.getByUsername(username);
  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const newId = await db_users.getNextId();

  const newUser = await db_users.create({ id: newId, username, password, isAdmin: false });

  const userDto = {
    username: newUser.username,
    password: newUser.password,
  };

  res.status(201).json(userDto);
};
