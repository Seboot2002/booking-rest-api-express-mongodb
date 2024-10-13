const { CompareHash } = require('../services/bcryptService');
const Group = require('../entities/Group');

class GroupUseCase {
    constructor(groupRepository) {
        this.groupRepository = groupRepository;
    }

    async createGroup(groupData, creatorId) {

        const groupModel = new Group({
            ...groupData,
            members: [creatorId],
            admins: [creatorId]
        });

        const finalGroup = await this.groupRepository.create(groupModel);
        return finalGroup;
    }

    async getGroupData(groupId){

        const group = await this.groupRepository.findById(groupId);

        return group;
    }

    async updateGroup(groupId, groupData){

        const check = await this.groupRepository.updateById(groupId, groupData);

        return check;
    }

    async deleteGroup(groupId){

        const check = await this.groupRepository.deleteById(groupId);

        return check;
    }

    async addMember(groupId, memberId) {

        const group = await this.groupRepository.findById(groupId);
        if (!group) throw new Error("Group not found");

        if (group.members.includes(memberId)) throw new Error("Member is already in the group");

        group.members.push(memberId);

        const result = await this.groupRepository.updateById(groupId, group);

        return result;
    }
}

module.exports = GroupUseCase;
