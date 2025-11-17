const db_books = require("../../../proxy/db_books");

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const book = await db_books.getById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }
    
    const deletedBook = await db_books.deleteById(id);
    return res.json({ message: "Livre supprimé", deleted: deletedBook[0] });
  } catch (err) {
    return res.status(404).json({ message: "Delete book error" });
  }
};
