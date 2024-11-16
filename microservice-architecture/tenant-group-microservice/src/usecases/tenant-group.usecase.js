const TenantGroup = require("../entities/TenantGroup");

class TenantGroupUseCase {

    constructor(tenantGroupRepository) {

        this.tenantGroupRepository = tenantGroupRepository;
    }

    async createTenantGroup(tenantGroupData) {

        const tenantGroupModel = new TenantGroup({
            title: tenantGroupData.title,
            users: tenantGroupData.users
        });

        const finalModel = await this.tenantGroupRepository.create(tenantGroupModel);

        return finalModel;
    }

    async getTenantGroupData(tenantGroupId, userToken){

        const tenantGroup = await this.tenantGroupRepository.findByIdDetailed(tenantGroupId, userToken);

        return tenantGroup;
    }

    async updateTenantGroup(tenantGroupId, tenantGroupData){

        const check = await this.tenantGroupRepository.updateById(tenantGroupId, tenantGroupData);

        return check;
    }

    async deleteTenantGroup(tenantGroupId){

        const check = await this.tenantGroupRepository.deleteById(tenantGroupId);

        return check;
    }
}
module.exports = TenantGroupUseCase;