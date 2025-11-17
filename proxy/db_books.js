const books = require("../mocked_database/books");

module.exports = {
  getAll: async () => {
    return books;
  },
  getById: async (id) => {
    return books.find((b) => b.id === id);
  },
  create: async (book) => {
    books.push(book);
    return book;
  },
  updateById: async (id, book) => {
    const bookIndex = books.findIndex((b) => b.id === id);
    if (bookIndex === -1) {
      throw "Book not found";
    }
    books[bookIndex] = book;
    return books[bookIndex];
  },
  deleteById: async (id) => {
    const bookIndex = books.findIndex((b) => b.id === id);
    if (bookIndex === -1) {
      throw "Book not found";
    }
    return books.splice(bookIndex, 1);
  },
};
