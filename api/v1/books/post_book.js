const db_books = require("../../../proxy/db_books");

module.exports = async (req, res) => {
  console.log(req.body);
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Titre et auteur sont requis." });
  }

  const newBook = await db_books.create({ title, author });

  const bookDto = {
    title: newBook.title,
    author: newBook.author,
  };

  res.status(201).json(bookDto);
};
