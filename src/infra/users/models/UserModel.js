const path = require("path");
const User = require("../../../domain/users/factory/UserCreate");
const InvalidField = require("../../../domain/errors/InvalidField");
const NotFound = require("../../../domain/errors/NotFound");
const readFile = require("../../../utils/readFile");
const writeFile = require("../../../utils/writeFile");
const usersDatabase = path.resolve("src", "infra", "db", "Users.json");

const UserModel = () => {
  const userNotFound = () => {
    throw new NotFound("User not found");
  };

  const idIsRequired = () => {
    throw new InvalidField("Id is require", "id");
  };

  return {
    list() {
      const users = readFile(usersDatabase);

      return users?.map(({ id, name, email, password, type }) =>
        User({ id, name, email, password, type })
      );
    },
    findById(id) {
      const users = readFile(usersDatabase);

      if (!users?.length) userNotFound();

      const user = users.find((user) => user.id === id);

      if (!user) userNotFound();

      const { name, email, password, type } = user;

      return User({ id, name, email, password, type });
    },
    create(user) {
      const users = readFile(usersDatabase);

      users.push(user);

      writeFile(path, users);

      return user;
    },
    update(id, value) {
      if (!id) idIsRequired();

      const users = readFile(usersDatabase);

      const userIndex = users.findIndex((user) => user.id === id);

      if (userIndex === -1) userNotFound();

      users[userIndex] = {
        ...users[userIndex],
        ...value,
      };

      writeFile(usersDatabase, users);

      return true;
    },
    delete(id) {
      if (!id) idIsRequired();

      const users = readFile(usersDatabase);

      const userIndex = users.findIndex((user) => user.id === id);

      if (userIndex === -1) userNotFound();

      users.splice(userIndex, 1);

      writeFile(usersDatabase, users);

      return true;
    },
  };
};

module.exports = UserModel();
