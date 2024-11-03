const { ObjectId } = require("mongodb");

class GroupRepository {

    constructor(db){
        this.collection = db.collection('Group');
        this.userCollection = db.collection('User');
    }

    async create(group) {

        const result = this.collection.insertOne({
            name: group.name,
            description: group.description,
            privacy: group.privacy,
            members: group.members,
            admins: group.admins,
            groupAvatar: group.groupAvatar,
            createdAt: group.createdAt,
        });

        return result;
    }

    async findById(groupId) {

        if (!ObjectId.isValid(groupId)) throw new Error('Invalid Group ID format');

        const group = await this.collection.findOne({ _id: ObjectId.createFromHexString(groupId) });
        
        const memberIds = group.members.map(id => ObjectId.createFromHexString(id));
        const adminIds = group.members.map(id => ObjectId.createFromHexString(id));

        const members = await this.userCollection.find({ _id: { $in: memberIds } }).toArray();
        const admins = await this.userCollection.find({ _id: { $in: adminIds } }).toArray();

        const membersNoSen = members.map(({ _id: idH, password: passwordH, ...rest }) => rest);
        const adminsNoSen = admins.map(({ _id: idH, password: passwordH, ...rest }) => rest);
        
        const groupDetails = {
            ...group,
            members: membersNoSen,
            admins: adminsNoSen
        }

        return groupDetails;
    }

    async updateById(groupId, groupData) {
        
        if (!ObjectId.isValid(groupId)) throw new Error('Invalid Group ID format');

        const currentGroup = await this.findById(groupId);
        if (!currentGroup) {
            throw new Error('Group not found');
        }

        const result = await this.collection.updateOne(
            { _id: ObjectId.createFromHexString(groupId)}, 
            {
                $set: {
                    name: groupData.name || currentGroup.name,
                    description: groupData.description || currentGroup.description,
                    members: groupData.members || currentGroup.members,
                    admins: groupData.admins || currentGroup.admins,
                    privacy: groupData.privacy || currentGroup.privacy,
                    groupAvatar: groupData.groupAvatar || currentGroup.groupAvatar
                }
            }
        );

        return result.matchedCount > 0;
    }

    async deleteById(groupId) {
        const result = await this.collection.deleteOne({ _id: ObjectId.createFromHexString(groupId) });
        return result.deletedCount > 0;
    }
    
}

module.exports = GroupRepository;