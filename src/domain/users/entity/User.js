const InvalidField = require("../../errors/InvalidField");

const User = ({ id, name, email, type, password }) => {
  return {
    id,
    name,
    email,
    type,
    password,
    isValid() {
      if (!this.id) {
        throw new InvalidField("Id is required", "name");
      }

      if (!this.name) {
        throw new InvalidField("Name is required", "name");
      }

      if (!this.email) {
        throw new InvalidField("Email is required", "email");
      }

      if (!this.type) {
        throw new InvalidField("Type is required", "type");
      }

      if (!this.password) {
        throw new InvalidField("Password is required", "password");
      }
    },
  };
};

module.exports = User;
