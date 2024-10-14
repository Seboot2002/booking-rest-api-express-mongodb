const Reservation = require("../entities/Reservation");

class ReservationUseCase {

    constructor(reservationRepository) {

        this.reservationRepository = reservationRepository;
    }

    async createReservation(reservationData, userId, departmentId) {

        const reservationModel = new Reservation({
            details: reservationData.details,
            date_start: reservationData.date_start,
            date_end: reservationData.date_end,
            created_at: reservationData.created_at,
            id_user: userId,
            id_department: departmentId
        });

        const finalReservation = await this.reservationRepository.create(reservationModel);
        return finalReservation;
    }

    async getReservationData(reservationId){

        const reservation = await this.reservationRepository.findById(reservationId);

        return reservation;
    }

    async updateReservation(reservationId, reservationData){

        const check = await this.reservationRepository.updateById(reservationId, reservationData);

        return check;
    }

    async deleteReservation(reservationId){

        const check = await this.reservationRepository.deleteById(reservationId);

        return check;
    }
}
module.exports = ReservationUseCase;