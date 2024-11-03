const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

module.exports = (db) => {

    const ReservationRepository = require("../repositories/reservation.repository");
    const ReservationController = require("../controllers/reservation.controller");

    const reservationRepository = new ReservationRepository(db);
    const reservationController = new ReservationController(reservationRepository);

    router.post("/:id", verifyToken, (req, res) => reservationController.createReservation(req, res));

    router.get("/:id", verifyToken, (req, res) => reservationController.getReservationData(req, res));

    router.put("/:id", verifyToken, (req, res) => reservationController.updateReservation(req, res));

    router.delete("/:id", verifyToken, (req, res) => reservationController.deleteReservation(req, res));

    return router;
};
