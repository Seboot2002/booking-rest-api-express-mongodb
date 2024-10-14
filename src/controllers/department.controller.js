const DepartmentUseCase = require("../usecases/department.usecase");

class ReservationController {

    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
        this.departmentUseCase = new DepartmentUseCase(this.departmentRepository);
    }

    async createDepartment(req, res) {
        
        const userId = req.token_usuarioId;

        try {
            let department = await this.departmentUseCase.createDepartment(req.body, userId);

            res.status(201).json(department);

        } catch (error) {

            res.status(400).json({ error: error.message });
        }
    }

    async getDepartmentData(req, res) {
        
        try {
            const department = await this.departmentUseCase.getDepartmentData(req.params.id);

            res.status(201).send(department);

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateDepartment(req, res) {

        try {
            const check = await this.departmentUseCase.updateDepartment(req.params.id, req.body);

            if (check){
                res.status(201).send("Department updated");
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteDepartment(req, res) {

        try {
            const check = await this.departmentUseCase.deleteDepartment(req.params.id);

            if (check){
                res.status(201).send("Department deleted");
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = ReservationController;