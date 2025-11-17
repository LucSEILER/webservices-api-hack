const db_books = require("../../../proxy/db_books");
const { generateBookLinks } = require("../../../utils/hateoas");

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  const book = await db_books.getById(id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const apiVersion = req.apiVersion || "v1";

  const bookDto = {
    title: book.title,
    author: book.author,
  };

  res.json({
    book: bookDto,
    links: generateBookLinks(book, apiVersion),
  });
};
