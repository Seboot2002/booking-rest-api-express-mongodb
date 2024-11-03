const Capital = require("../entities/Capital");

class CapitalUseCase {

    constructor(capitalRepository) {

        this.capitalRepository = capitalRepository;
    }

    async createCapital(capitalData, userId) {

        const capitalModel = new Capital({
            total_money: capitalData.total_money,
            user: userId
        });

        const finalModel = await this.capitalRepository.create(capitalModel);

        return finalModel;
    }

    async getCapitalData(capitalId, userToken){

        const capital = await this.capitalRepository.findByIdDetailed(capitalId, userToken);

        return capital;
    }

    async updateCapital(capitalId, capitalData){

        const check = await this.capitalRepository.updateById(capitalId, capitalData);

        return check;
    }

    async deleteCapital(capitalId){

        const check = await this.capitalRepository.deleteById(capitalId);

        return check;
    }
}
module.exports = CapitalUseCase;