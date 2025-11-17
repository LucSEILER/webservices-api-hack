const db_users = require("../../../proxy/db_users");

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);

  let username;
  if (!req.body || typeof req.body.username === "undefined" || typeof req.body.username !== "string") {
    return res.status(400).json({ message: "Le champ username est requis et doit être une chaîne de caractères." });
  } else {
    username = req.body.username;
  }
  
  let password;
  if (!req.body || typeof req.body.password === "undefined" || typeof req.body.password !== "string") {
    return res.status(400).json({ message: "Le champ password est requis et doit être une chaîne de caractères." });
  } else {
    password = req.body.password;
  }

  isAdmin = false;
  if (req.body && typeof req.body.isAdmin !== "undefined") {
    const v = req.body.isAdmin;
    isAdmin = v === true;
  }

  try {
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
