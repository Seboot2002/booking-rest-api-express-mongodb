const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

module.exports = (db) => {

    const CapitalRepository = require("../repositories/capital.repository");
    const CapitalController = require("../controllers/capital.controller");

    const capitalRepository = new CapitalRepository(db);
    const capitalController = new CapitalController(capitalRepository);

    router.post("/", verifyToken, (req, res) => capitalController.createCapital(req, res));

    router.get("/:id", verifyToken, (req, res) => capitalController.getCapitalData(req, res));

    router.put("/:id", verifyToken, (req, res) => capitalController.updateCapital(req, res));

    router.delete("/:id", verifyToken, (req, res) => capitalController.deleteCapital(req, res));

    return router;
};
