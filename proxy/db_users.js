const users = require("../mocked_database/users");

module.exports = {
  getAll: async () => {
    return users;
  },
  getById: async (id) => {
    return users.find((b) => b.id === id);
  },
  getNextId: async () => {
    if (users.length === 0) return 1;
    return Math.max(...users.map((u) => u.id)) + 1;
  },
  getByUsername: async (username) => {
    return users.find((b) => b.username === username);
  },
  create: async (user) => {
    users.push(user);
    return user;
  },
  updateById: async (id, user) => {
    user.id = id;
    const userIndex = users.findIndex((b) => b.id === id);
    if (userIndex === -1) {
      throw "user not found";
    }
    users[userIndex] = user;
    return users[userIndex];
  },
  deleteById: async (id) => {
    const userIndex = users.findIndex((b) => b.id === id);
    if (userIndex === -1) {
      throw "user not found";
    }
    return users.splice(userIndex, 1);
  },
};
