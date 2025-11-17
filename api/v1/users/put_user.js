const db_users = require("../../../proxy/db_users");

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);

  username;
  if (!req.body || typeof req.body.username === "undefined" || typeof req.body.username !== "string") {
    return res.status(400).json({ message: "Le champ username est requis et doit être une chaîne de caractères." });
  } else {
    username = req.body.username;
  }

  isAdmin = false;
  if (req.body && typeof req.body.isAdmin !== "undefined") {
    const v = req.body.isAdmin;
    isAdmin = v === true;
  } else {
    return res.status(400).json({ message: "Le champ isAdmin doit être de type Boolean." });
  }

  try {
    const updatedUser = await db_users.updateById(id, { username, isAdmin });
    const userDto = {
      username: updatedUser.username,
      isAdmin: updatedUser.isAdmin,
    };
    res.json(userDto);
  } catch (err) {
    return res.status(404).json({ message: "Update user error: " + err });
  }
};
