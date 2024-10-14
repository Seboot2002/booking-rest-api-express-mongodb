const ReservationUseCase = require("../usecases/reservation.usecase");

class ReservationController {

    constructor(reservationRepository) {
        this.reservationRepository = reservationRepository;
        this.reservationUseCase = new ReservationUseCase(this.reservationRepository);
    }

    async createReservation(req, res) {
        
        const userId = req.token_usuarioId;
        const departmentId = req.params.id;

        try {
            let reservation = await this.reservationUseCase.createReservation(req.body, userId, departmentId);

            res.status(201).json(reservation);

        } catch (error) {

            res.status(400).json({ error: error.message });
        }
    }

    async getReservationData(req, res) {
        
        try {
            const group = await this.reservationUseCase.getReservationData(req.params.id);

            res.status(201).send(group);

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateReservation(req, res) {

        try {
            const check = await this.reservationUseCase.updateReservation(req.params.id, req.body);

            if (check){
                res.status(201).send("Reservation updated");
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteReservation(req, res) {

        try {
            const check = await this.reservationUseCase.deleteReservation(req.params.id);

            if (check){
                res.status(201).send("Reservation deleted");
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = ReservationController;