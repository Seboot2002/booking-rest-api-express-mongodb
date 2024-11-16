const TenantGroupUseCase = require("../usecases/tenant-group.usecase");

class TenantGroupController {

    constructor(tenantGroupRepository) {
        this.tenantGroupRepository = tenantGroupRepository;
        this.tenantGroupUseCase = new TenantGroupUseCase(this.tenantGroupRepository);
    }

    async createTenantGroup(req, res) {
        
        const userId = req.token_usuarioId;

        try {
            let tenantGroup = await this.tenantGroupUseCase.createTenantGroup(req.body, userId);

            res.status(201).json(tenantGroup);

        } catch (error) {

            res.status(400).json({ error: error.message });
        }
    }

    async getTenantGroupData(req, res) {
        
        const userToken = req.token_only;

        try {
            const tenantGroup = await this.tenantGroupUseCase.getTenantGroupData(req.params.id, userToken);

            res.status(201).send(tenantGroup);

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateTenantGroup(req, res) {

        try {
            const check = await this.tenantGroupUseCase.updateTenantGroup(req.params.id, req.body);

            if (check){
                res.status(201).send("Tenant Group updated");
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteTenantGroup(req, res) {

        try {
            const check = await this.tenantGroupUseCase.deleteTenantGroup(req.params.id);

            if (check){
                res.status(201).send("Tenant Group deleted");
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = TenantGroupController;