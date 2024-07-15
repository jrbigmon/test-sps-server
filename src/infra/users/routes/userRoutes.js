const express = require("express");
const UserService = require("../services/userService");
const verifyToken = require("../../middleware/verifytoken");

const router = express.Router();

router.get("/users", verifyToken, UserService.findAll);
router.post("/users", verifyToken, UserService.create);
router.delete("/users", verifyToken, UserService.delete);
router.get("/users/:id", verifyToken, UserService.findById);
router.put("/users/:id", verifyToken, UserService.update);
router.post("/login", UserService.login);

module.exports = router;
