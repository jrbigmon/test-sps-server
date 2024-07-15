const express = require("express");
const UserService = require("../services/userService");

const router = express.Router();

router.get("/users", UserService.findAll);
router.post("/users", UserService.create);
router.put("/users", UserService.update);
router.delete("/users", UserService.delete);
router.get("/users:id", UserService.getById);

module.exports = router;
