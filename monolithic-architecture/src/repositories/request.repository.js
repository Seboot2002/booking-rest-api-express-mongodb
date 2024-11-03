const { ObjectId } = require("mongodb");

class RequestRepository {

    constructor(db) {
        this.collection = db.collection('Request');
        this.userCollection = db.collection('User');
    }

    async create(request) {

        const result = this.collection.insertOne({
            text: request.text,
            viewed: request.viewed,
            emisor: request.emisor,
            receptor: request.receptor
        });

        return result;
    }

    async findById(requestId) {

        const request = await this.collection.findOne({ _id: ObjectId.createFromHexString(requestId) }, 
        {
            projection: {
                _id: 0
            }
        });

        return request;
    }

    async findByIdDetailed(requestId) {

        const request = await this.collection.findOne({ _id: ObjectId.createFromHexString(requestId) }, 
        {
            projection: {
                _id: 0
            }
        });
        const arrendatario = await this.userCollection.findOne({ _id: ObjectId.createFromHexString(request.emisor) }, 
        {
            projection: {
                _id: 0,
                password: 0
            }
        });
        const arrendador = await this.userCollection.findOne({ _id: ObjectId.createFromHexString(request.receptor) }, 
        {
            projection: {
                _id: 0,
                password: 0
            }
        });

        const requestDetails = {
            ...request,
            emisor: arrendatario,
            receptor: arrendador
        }

        return requestDetails;
    }

    async updateById(requestId, requestData) {

        const currentRequest = await this.findById(requestId);
        if (!currentRequest) {
            throw new Error('Request not found');
        }

        const result = await this.collection.updateOne(
            { _id: ObjectId.createFromHexString(requestId)}, 
            {
                $set: {
                    text: requestData.text || currentRequest.text,
                    viewed: requestData.viewed || currentRequest.viewed,
                    emisor: requestData.emisor || currentRequest.emisor,
                    receptor: requestData.receptor || currentRequest.receptor
                }
            }
        );

        return result.matchedCount > 0;
    }

    async deleteById(requestId) {
        const result = await this.collection.deleteOne({ _id: ObjectId.createFromHexString(requestId) });
        return result.deletedCount > 0;
    }

}

module.exports = RequestRepository;