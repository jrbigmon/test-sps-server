const genUUID = require("../../../utils/genUUID");
const User = require("../entity/User");

const UserCreate = ({ name, email, type, password }) => {
  const newUser = User({ id: genUUID(), name, email, type, password });

  newUser.isValid();

  return newUser;
};

module.exports = UserCreate;
