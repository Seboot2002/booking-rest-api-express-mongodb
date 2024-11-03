const { ObjectId } = require("mongodb");

class ReservationRepository {

    constructor(db) {
        this.collection = db.collection('Department');
        this.userCollection = db.collection('User');
    }

    async create(department) {

        const result = this.collection.insertOne({
            direccion: department.direccion,
            distrito: department.distrito,
            arrendador: department.arrendador
        });

        return result;
    }

    async findById(departmentId) {

        const department = await this.collection.findOne({ _id: ObjectId.createFromHexString(departmentId) });

        if (!department) {
            throw new Error('Department not found');
        }

        const arrendador = await this.userCollection.findOne({ _id: ObjectId.createFromHexString(department.arrendador) });

        const { _id: departmentIdHidden, ...departmentNoId } = department;
        const { _id: arrendadorIdHidden, password: passwordH, ...arrendadorNoId } = arrendador;

        const department_arrendador = {
            ...departmentNoId,
            arrendador: arrendadorNoId
        }

        return department_arrendador;
    }

    async updateById(departmentId, departmentData) {

        const currentDepartment = await this.findById(departmentId);
        if (!currentDepartment) {
            throw new Error('Department not found');
        }

        const result = await this.collection.updateOne(
            { _id: ObjectId.createFromHexString(departmentId)}, 
            {
                $set: {
                    direccion: departmentData.direccion || currentDepartment.direccion,
                    distrito: departmentData.distrito || currentDepartment.distrito,
                    arrendador: departmentData.arrendador || currentDepartment.arrendador
                }
            }
        );

        return result.matchedCount > 0;
    }

    async deleteById(departmentId) {
        const result = await this.collection.deleteOne({ _id: ObjectId.createFromHexString(departmentId) });
        return result.deletedCount > 0;
    }

}

module.exports = ReservationRepository;