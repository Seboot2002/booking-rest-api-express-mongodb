const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

module.exports = (db) => {

    const TenantGroupRepository = require("../repositories/tenant-group.repository");
    const TenantGroupController = require("../controllers/tenant-group.controller");

    const tenantGroupRepository = new TenantGroupRepository(db);
    const tenantGroupController = new TenantGroupController(tenantGroupRepository);

    router.post("/", verifyToken, (req, res) => tenantGroupController.createTenantGroup(req, res));

    router.get("/:id", verifyToken, (req, res) => tenantGroupController.getTenantGroupData(req, res));

    router.put("/:id", verifyToken, (req, res) => tenantGroupController.updateTenantGroup(req, res));

    router.delete("/:id", verifyToken, (req, res) => tenantGroupController.deleteTenantGroup(req, res));

    return router;
};
