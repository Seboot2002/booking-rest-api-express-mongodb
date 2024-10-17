const RequestUseCase = require("../usecases/request.usecases");

class RequestController {

    constructor(requestRepository) {
        this.requestRepository = requestRepository;
        this.requestUseCase = new RequestUseCase(this.requestRepository);
    }

    async createRequest(req, res) {
        
        const userId = req.token_usuarioId;
        const receptorId = req.params.id;

        try {
            let request = await this.requestUseCase.createRequest(req.body, userId, receptorId);

            res.status(201).json(request);

        } catch (error) {

            res.status(400).json({ error: error.message });
        }
    }

    async getRequestData(req, res) {
        
        try {
            const request = await this.requestUseCase.getRequestData(req.params.id);

            res.status(201).send(request);

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateRequest(req, res) {

        try {
            const check = await this.requestUseCase.updateRequest(req.params.id, req.body);

            if (check){
                res.status(201).send("Request updated");
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteRequest(req, res) {

        try {
            const check = await this.requestUseCase.deleteRequest(req.params.id);

            if (check){
                res.status(201).send("Request deleted");
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = RequestController;