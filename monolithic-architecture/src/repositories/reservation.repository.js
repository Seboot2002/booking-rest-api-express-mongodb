const { ObjectId } = require("mongodb");

class ReservationRepository {

    constructor(db) {
        this.collection = db.collection('Reservation');
        this.userCollection = db.collection('User');
        this.departmentcollection = db.collection('Department');
    }

    async create(reservation) {

        const result = this.collection.insertOne({
            details: reservation.details,
            date_start: reservation.date_start,
            date_end: reservation.date_end,
            created_at: reservation.created_at,
            id_user: reservation.id_user,
            id_department: reservation.id_department
        });

        return result;
    }

    async findById(reservationId) {

        const reservation = await this.collection.findOne({ _id: ObjectId.createFromHexString(reservationId) }, 
        {
            projection: {
                _id: 0
            }
        });
        const arrendatario = await this.userCollection.findOne({ _id: ObjectId.createFromHexString(reservation.id_user) }, 
        {
            projection: {
                _id: 0,
                password: 0
            }
        });
        const department = await this.departmentcollection.findOne({ _id: ObjectId.createFromHexString(reservation.id_department) }, 
        {
            projection: {
                _id: 0,
                password: 0
            }
        });
        const arrendador = await this.userCollection.findOne({ _id: ObjectId.createFromHexString(department.arrendador) }, 
        {
            projection: {
                _id: 0,
                password: 0
            }
        });
        department.arrendador = arrendador;

        const reservationDetails = {
            ...reservation,
            id_user: arrendatario,
            id_department: department
        }

        return reservationDetails;
    }

    async updateById(reservationId, reservationData) {

        const currentReservation = await this.findById(reservationId);
        if (!currentReservation) {
            throw new Error('Reservation not found');
        }

        const result = await this.collection.updateOne(
            { _id: ObjectId.createFromHexString(reservationId)}, 
            {
                $set: {
                    details: reservationData.details || currentReservation.details,
                    date_start: reservationData.date_start || currentReservation.date_start,
                    date_end: reservationData.date_end || currentReservation.date_end,
                    created_at: reservationData.created_at || currentReservation.created_at,
                    id_user: reservationData.id_user || currentReservation.id_user,
                    id_department: reservationData.id_department || currentReservation.id_department
                }
            }
        );

        return result.matchedCount > 0;
    }

    async deleteById(reservationId) {
        const result = await this.collection.deleteOne({ _id: ObjectId.createFromHexString(reservationId) });
        return result.deletedCount > 0;
    }

}

module.exports = ReservationRepository;