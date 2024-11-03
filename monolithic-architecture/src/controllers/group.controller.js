const jwt = require("jsonwebtoken");
const crypto = require("../utils/crypto.utils");

const GroupUseCase = require("../usecases/group.usecase");

class GroupController {
    constructor(groupRepository) {
        this.groupRepository = groupRepository;
        this.groupUseCase = new GroupUseCase(this.groupRepository);
    }

    async createGroup(req, res) {
        
        const userId = req.token_usuarioId;

        try {
            let group = await this.groupUseCase.createGroup(req.body, userId);

            res.status(201).json(group);

        } catch (error) {

            res.status(400).json({ error: error.message });
        }
    }

    async getGroupData(req, res) {
        
        try {
            const group = await this.groupUseCase.getGroupData(req.params.id);

            res.status(201).send(group);

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateGroup(req, res) {

        try {
            const check = await this.groupUseCase.updateGroup(req.params.id, req.body);

            if (check){
                res.status(201).send("Group updated");
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteGroup(req, res) {

        try {
            const check = await this.groupUseCase.deleteGroup(req.params.id);

            if (check){
                res.status(201).send("Group deleted");
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async addMember(req, res) {

        const { groupId, memberId } = req.params;

        try {
            const check = await this.groupUseCase.addMember(groupId, memberId);
            if (check){
                res.status(201).send("New user was added");
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = GroupController;