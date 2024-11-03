const Request = require("../entities/Request");

class RequestUseCase {

    constructor(requestRepository) {

        this.requestRepository = requestRepository;
    }

    async createRequest(requestData, userId, receptorId) {

        const requestModel = new Request({
            text: requestData.text,
            emisor: userId,
            receptor: receptorId
        });

        const finalRequest = await this.requestRepository.create(requestModel);
        return finalRequest;
    }

    async getRequestData(requestId){

        const request = await this.requestRepository.findByIdDetailed(requestId);

        return request;
    }

    async updateRequest(requestId, requestData){

        const check = await this.requestRepository.updateById(requestId, requestData);

        return check;
    }

    async deleteRequest(requestId){

        const check = await this.requestRepository.deleteById(requestId);

        return check;
    }
}
module.exports = RequestUseCase;