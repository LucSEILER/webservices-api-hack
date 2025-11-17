const db_books = require("../../../proxy/db_books");

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required." });
  }

  try {
    const userId = req.user.id;
    const book = await db_books.getById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    if (book.userId !== userId) {
      return res.status(403).json({ message: "Access denied." });
    }

    const updatedBook = await db_books.updateById(id, { title, author });
    const bookDto = {
      title: updatedBook.title,
      author: updatedBook.author,
    };
    res.json(bookDto);
  } catch (err) {
    return res.status(404).json({ message: "Update book error: " + err });
  }
};
