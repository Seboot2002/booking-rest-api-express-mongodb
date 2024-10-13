const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

module.exports = (db) => {

    const GroupRepository = require("../repositories/group.repository");
    const GroupController = require("../controllers/group.controller");

    const groupRepository = new GroupRepository(db);
    const groupController = new GroupController(groupRepository);

    router.post("/", verifyToken, (req, res) => groupController.createGroup(req, res));

    router.get("/:id", verifyToken, (req, res) => groupController.getGroupData(req, res));

    router.put("/:id", verifyToken, (req, res) => groupController.updateGroup(req, res));

    router.delete("/:id", verifyToken, (req, res) => groupController.deleteGroup(req, res));

    router.put("/add-member/:groupId/:memberId", verifyToken, (req, res) => groupController.addMember(req, res));

    return router;
};
