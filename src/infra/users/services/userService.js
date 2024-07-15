const InvalidField = require("../../../domain/errors/InvalidField");
const UserCreate = require("../../../domain/users/factory/UserCreate");
const UserModel = require("../models/UserModel");
const { list } = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const UserService = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const users = UserModel.list();

      const user = users.find((userInDb) => email === userInDb.email);

      if (!user) {
        return res.status(403).json({
          error: "User unauthorized",
          statusCode: 403,
        });
      }

      if (user.password !== password) {
        return res.status(403).json({
          error: "User unauthorized",
          statusCode: 403,
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        "shiu",
        {
          expiresIn: "1h",
        }
      );

      return res
        .status(201)
        .json({ message: "Autentication successfully", token });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        statusCode: error.statusCode,
      });
    }
  },
  findById(req, res) {
    try {
      const { id } = req.params || {};
      console.log(id);
      const user = UserModel.findById(id);

      return res.status(200).json({
        success: true,
        result: user,
        statusCode: 200,
      });
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
      return res.status(200).json({
        result: users,
        success: true,
        statusCode: 200,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        error: error.message,
        statusCode: error.statusCode || 500,
      });
    }
  },

  create(req, res) {
    try {
      const { name, email, type, password } = req.body || {};

      const users = UserModel.list();

      if (users.find((user) => user.email === email)) {
        throw new InvalidField("Email already exists", "email");
      }

      const userCreated = UserCreate({ name, email, type, password });

      userCreated.isValid();

      UserModel.create(userCreated);

      return res.status(201).json({
        result: userCreated,
        success: true,
        statusCode: 201,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        error: error.message,
        statusCode: error.statusCode || 500,
      });
    }
  },

  update(req, res) {
    try {
      const { id } = req.params || {};
      const { name, email, type, password } = req.body || {};

      const user = UserModel.findById(id);

      if (name) user.name = name;
      if (email) user.email = email;
      if (type) user.type = type;
      if (password) user.password = password;

      user.isValid();

      UserModel.update(id, user);

      return res.status(200).json({
        result: true,
        success: true,
        statusCode: 200,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        error: error.message,
        statusCode: error.statusCode || 500,
      });
    }
  },

  delete(req, res) {
    try {
      const { id } = req.params || {};

      UserModel.delete(id);

      return res.status(200).json({
        result: true,
        success: true,
        statusCode: 200,
      });
    } catch (error) {
      return res.status(error.statusCode | 500).json({
        error: error.message,
        statusCode: error.statusCode || 500,
      });
    }
  },
};

module.exports = UserService;
