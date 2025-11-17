const db_users = require("../../../proxy/db_users");

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);

  const { username, password, isAdmin } = req.body;
  if (!username || !password || isAdmin === undefined) {
    return res.status(400).json({ message: "Username, password and isAdmin are required." });
  }

  try {
    const user = await db_users.getById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    console.log(user.username, req.user.username);

    if (user.username !== req.user.username) {
      return res.status(403).json({ message: "You can only update your own account." });
    }

    const updatedUser = await db_users.updateById(id, { username, password, isAdmin });
    const userDto = {
      username: updatedUser.username,
      password: updatedUser.password,
      isAdmin: updatedUser.isAdmin,
    };
    res.json(userDto);
  } catch (err) {
    return res.status(404).json({ message: "Update user error: " + err });
  }
};
