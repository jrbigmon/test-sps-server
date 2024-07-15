const UserCreate = require("../../../domain/users/factory/UserCreate");
const UserModel = require("../models/UserModel");
const { list } = require("../models/UserModel");

const UserService = {
  findById(req, res) {
    try {
      const { id } = req.params || {};

      return UserModel.findById(id);
    } catch (error) {
      return res.status(error.statusCode | 500).json({
        error: error.message,
        statusCode: error.statusCode || 500,
      });
    }
  },

  findAll(_, res) {
    try {
      const users = list();
      return res.send(users);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },

  create(req, res) {
    try {
      const { name, email, type, password } = req.body || {};

      const userCreated = UserCreate({ name, email, type, password });

      userCreated.isValid();

      UserModel.create(userCreated);

      return res.status(201).json(userCreated);
    } catch (error) {
      return res.status(error.statusCode).json({
        error: error.message,
        statusCode: error.statusCode,
      });
    }
  },

  update(req, res) {
    try {
      const { id, name, email, type, password } = req.body || {};

      const user = UserModel.findById(id);

      if (name) userInDatabase.name = name;
      if (email) userInDatabase.email = email;
      if (type) userInDatabase.type = type;
      if (password) userInDatabase.password = passworde;

      user.isValid();

      UserModel.update(user.id, user);
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        error: error.message,
        statusCode: error.statusCode || 500,
      });
    }
  },
};

module.exports = UserService;
