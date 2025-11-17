const db_users = require("../../../proxy/db_users");

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const user = await db_users.getById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.username !== req.user.username) {
      return res.status(403).json({ message: "You can only delete your own account" });
    }

    const deletedUser = await db_users.deleteById(id);
    return res.json({ message: "User deleted", deleted: deletedUser[0] });
  } catch (err) {
    return res.status(404).json({ message: "Delete user error" });
  }
};
