const Department = require("../entities/Department");

class ReservationUseCase {

    constructor(departmentRepository) {

        this.departmentRepository = departmentRepository;
    }

    async createDepartment(departmentData, userId) {

        const reservationModel = new Department({
            direccion: departmentData.direccion,
            distrito: departmentData.distrito,
            arrendador: userId
        });

        const finalReservation = await this.departmentRepository.create(reservationModel);
        return finalReservation;
    }

    async getDepartmentData(departmentId){

        const reservation = await this.departmentRepository.findById(departmentId);

        return reservation;
    }

    async updateDepartment(departmentId, departmentData){

        const check = await this.departmentRepository.updateById(departmentId, departmentData);

        return check;
    }

    async deleteDepartment(departmentId){

        const check = await this.departmentRepository.deleteById(departmentId);

        return check;
    }
}
module.exports = ReservationUseCase;