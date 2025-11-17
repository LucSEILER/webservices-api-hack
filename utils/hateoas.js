function generateBookLinks(book, apiVersion = "v1") {
  const base = `/api/${apiVersion}/books/${book.id}`;
  return {
    self: { href: base, method: "GET" },
    collection: { href: `/api/${apiVersion}/books`, method: "GET" },
    update: { href: base, method: "PUT" },
    delete: { href: base, method: "DELETE" },
  };
}

function generateBooksCollectionLinks(apiVersion = "v1") {
  const base = `/api/${apiVersion}/books`;
  return {
    self: { href: base, method: "GET" },
    create: { href: base, method: "POST" },
  };
}

module.exports = {
  generateBookLinks,
  generateBooksCollectionLinks,
};
