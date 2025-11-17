const db_users = require("../../../proxy/db_users");

module.exports = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const newUser = await db_users.create({ username, password });

  const userDto = {
    username: newUser.username,
    password: newUser.password,
  };

  res.status(201).json(userDto);
};
