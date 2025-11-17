const db_books = require("../../../proxy/db_users");

module.exports = async (req, res) => {
  console.log(req.body);
  const { userName, password } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Le Nom et le mot de passe sont requis." });
  }

  const newUser = await db_users.create({ userName, password });

  const userDto = {
    userName: newUser.userName,
    password: newUser.password,
  };

  res.status(201).json(userDto);
};
