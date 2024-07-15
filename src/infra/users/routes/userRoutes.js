const express = require("express");
const UserService = require("../services/userService");

const router = express.Router();

router.get("/users", UserService.findAll);
router.post("/users", UserService.create);
router.delete("/users", UserService.delete);
router.get("/users/:id", UserService.findById);
router.put("/users/:id", UserService.update);

module.exports = router;
