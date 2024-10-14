class ReservationModel {

    constructor({ details, date_start, date_end, created_at = new Date(), id_user, id_department }){

        this.details = details;
        this.date_start = date_start;
        this.date_end = date_end;
        this.created_at = created_at;
        this.id_user = id_user;
        this.id_department = id_department;

    }
}

module.exports = ReservationModel;