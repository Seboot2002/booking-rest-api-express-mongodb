const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

module.exports = (db) => {

    const UserRepository = require("../repositories/user.repository");
    const UserController = require("../controllers/user.controller");

    const userRepository = new UserRepository(db);
    const userController = new UserController(userRepository);

    router.post("/", (req, res) => userController.createUser(req, res));

    router.post("/login", (req, res) => userController.loginUser(req, res));

    router.post("/bulk", verifyToken, (req, res) => userController.getBulkUsers(req, res));

    router.get("/", verifyToken, (req, res) => userController.getData(req, res));

    router.put("/", verifyToken, (req, res) => userController.updateUser(req, res));

    router.delete("/", verifyToken, (req, res) => userController.deleteUser(req, res));

    return router;
};
