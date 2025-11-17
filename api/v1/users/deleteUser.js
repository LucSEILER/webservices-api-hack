const db_users = require("../../../proxy/db_users");

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const deletedUser = await db_users.deleteById(id);
    return res.json({ message: "Utilisateur supprimé", deleted: deletedUser[0] });
  } catch (err) {
    return res.status(404).json({ message: "Delete user error" });
  }
};
