const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

module.exports = (db) => {

    const RequestRepository = require("../repositories/request.repository");
    const RequestController = require("../controllers/request.controller");

    const requestRepository = new RequestRepository(db);
    const requestController = new RequestController(requestRepository);

    router.post("/:id", verifyToken, (req, res) => requestController.createRequest(req, res));

    router.get("/:id", verifyToken, (req, res) => requestController.getRequestData(req, res));

    router.put("/:id", verifyToken, (req, res) => requestController.updateRequest(req, res));

    router.delete("/:id", verifyToken, (req, res) => requestController.deleteRequest(req, res));

    return router;
};
