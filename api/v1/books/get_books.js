const db_books = require("../../../proxy/db_books");
const { generateBooksCollectionLinks} = require("../../../utils/hateoas");

module.exports = async (req, res) => {
  const books = await db_books.getAll();

  const bookDtos = books.map((book) => ({
    title: book.title,
    author: book.author,
  }));

  res.json({
    books: bookDtos,
    links: generateBooksCollectionLinks(req.apiVersion)
  });
};
