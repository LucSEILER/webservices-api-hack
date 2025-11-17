const db_books = require("../../../proxy/db_books");

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);
  const book = await db_books.getById(id);

  console.log(book);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
};
