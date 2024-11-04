const CapitalUseCase = require("../usecases/capital.usecase");

class CapitalController {

    constructor(capitalRepository) {
        this.capitalRepository = capitalRepository;
        this.capitalUseCase = new CapitalUseCase(this.capitalRepository);
    }

    async createCapital(req, res) {
        
        const userId = req.token_usuarioId;

        try {
            let capital = await this.capitalUseCase.createCapital(req.body, userId);

            res.status(201).json(capital);

        } catch (error) {

            res.status(400).json({ error: error.message });
        }
    }

    async getCapitalData(req, res) {
        
        const userToken = req.token_only;

        try {
            const capital = await this.capitalUseCase.getCapitalData(req.params.id, userToken);

            res.status(201).send(capital);

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateCapital(req, res) {

        try {
            const check = await this.capitalUseCase.updateCapital(req.params.id, req.body);

            if (check){
                res.status(201).send("Capital updated");
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteCapital(req, res) {

        try {
            const check = await this.capitalUseCase.deleteCapital(req.params.id);

            if (check){
                res.status(201).send("Capital deleted");
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = CapitalController;