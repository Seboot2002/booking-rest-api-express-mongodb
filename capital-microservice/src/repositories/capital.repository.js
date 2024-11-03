const { ObjectId } = require("mongodb");
const { default: axios } = require("axios");

class CapitalRepository {

    constructor(db) {
        this.collection = db.collection('Capital');
    }

    async create(capital) {

        const result = this.collection.insertOne({
            total_money: capital.total_money,
            dep_resv_count: capital.dep_resv_count,
            created_at: capital.created_at,
            user: capital.user
        });

        return result;
    }

    async findById(capitalId) {

        const capital = await this.collection.findOne({ _id: ObjectId.createFromHexString(capitalId) }, 
        {
            projection: {
                _id: 0
            }
        });

        return capital;
    }

    async findByIdDetailed(capitalId, userToken) {

        const capital = await this.collection.findOne({ _id: ObjectId.createFromHexString(capitalId) }, 
        {
            projection: {
                _id: 0
            }
        });

        const user = (await axios.get(`http://user-microservice:3000/api/user`, {
            headers: {
                'Authorization': userToken
            }
        })).data;

        const capitalDetails = {
            ...capital,
            user: user
        }

        return capitalDetails;
    }

    async updateById(capitalId, capitalData) {

        const currentCapital = await this.findById(capitalId);
        if (!currentCapital) throw new Error('Capital not found');

        const result = await this.collection.updateOne(
            { _id: ObjectId.createFromHexString(capitalId)}, 
            {
                $set: {
                    total_money: capitalData.total_money || currentCapital.total_money,
                    dep_resv_count: capitalData.dep_resv_count || currentCapital.dep_resv_count,
                    created_at: capitalData.created_at || currentCapital.created_at,
                    user: capitalData.user || currentCapital.user
                }
            }
        );

        return result.matchedCount > 0;
    }

    async deleteById(capitalId) {
        const result = await this.collection.deleteOne({ _id: ObjectId.createFromHexString(capitalId) });
        return result.deletedCount > 0;
    }

}

module.exports = CapitalRepository;