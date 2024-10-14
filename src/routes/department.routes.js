const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

module.exports = (db) => {

    const DepartmentRepository = require("../repositories/department.repository");
    const DepartmentController = require("../controllers/department.controller");

    const departmentRepository = new DepartmentRepository(db);
    const departmentController = new DepartmentController(departmentRepository);

    router.post("/", verifyToken, (req, res) => departmentController.createDepartment(req, res));

    router.get("/:id", verifyToken, (req, res) => departmentController.getDepartmentData(req, res));

    router.put("/:id", verifyToken, (req, res) => departmentController.updateDepartment(req, res));

    router.delete("/:id", verifyToken, (req, res) => departmentController.deleteDepartment(req, res));

    return router;
};
