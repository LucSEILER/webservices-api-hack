const users = require("../mocked_database/user");

module.exports = {
  getAll: async () => {
    return users;
  },
  create: async (user) => {
    users.push(user);
    return user;
  },
  
};
