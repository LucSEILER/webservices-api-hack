const db_users = require("../../../proxy/db_users");

module.exports = async (req, res) => {
  const users = await db_users.getAll();

  const userDtos = users.map((user) => ({  
    id: user.id,
    username: user.username,
    password: user.password,
    isAdmin: user.isAdmin
  }));

  res.json({
    users: userDtos
  });
};