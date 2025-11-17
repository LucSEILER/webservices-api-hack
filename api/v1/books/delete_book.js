const db_books = require("../../../proxy/db_books");

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const deletedBook = await db_books.deleteById(id);
    return res.json({ message: "Book deleted", deleted: deletedBook[0] });
  } catch (err) {
    return res.status(404).json({ message: "Delete book error" });
  }
};
