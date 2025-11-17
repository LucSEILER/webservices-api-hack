const db_users = require("../../../proxy/db_users");

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const user = await db_users.getById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const updatedUser = await db_users.updateById(id, req.body);
    res.json(updatedUser);
  } catch (err) {
    return res.status(404).json({ message: "Update user error: " + err });
  }
};
