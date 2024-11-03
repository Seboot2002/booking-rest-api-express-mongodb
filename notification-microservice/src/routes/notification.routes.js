const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

module.exports = (db) => {

    const NotificationRepository = require("../repositories/notification.repository");
    const NotificationController = require("../controllers/notification.controller");

    const notificationRepository = new NotificationRepository(db);
    const notificationController = new NotificationController(notificationRepository);

    router.post("/", verifyToken, (req, res) => notificationController.createNotification(req, res));

    router.get("/:id", verifyToken, (req, res) => notificationController.getNotificationData(req, res));

    router.put("/:id", verifyToken, (req, res) => notificationController.updateNotification(req, res));

    router.delete("/:id", verifyToken, (req, res) => notificationController.deleteNotification(req, res));

    return router;
};
