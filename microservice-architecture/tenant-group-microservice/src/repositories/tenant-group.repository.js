const { ObjectId } = require("mongodb");
const { default: axios } = require("axios");

class TenantGroupRepository {

    constructor(db) {
        this.collection = db.collection('TenantGroup');
    }

    async create(tenantGroup) {

        const result = this.collection.insertOne({
            title: tenantGroup.title,
            users: tenantGroup.users.map(id => ObjectId.createFromHexString(id))
        });

        return result;
    }

    async findById(tenantGroupId) {

        const tenantGroup = await this.collection.findOne({ _id: ObjectId.createFromHexString(tenantGroupId) }, 
        {
            projection: {
                _id: 0
            }
        });

        return tenantGroup;
    }

    async findByIdDetailed(tenantGroupId, userToken) {

        const tenantGroup = await this.collection.findOne({ _id: ObjectId.createFromHexString(tenantGroupId) }, 
        {
            projection: {
                _id: 0
            }
        });

        if (!tenantGroup) throw new Error("Tenant Group not found");

        const userIds = tenantGroup.users;

        const users = (await axios.post(`http://user-microservice:3000/api/user/bulk`,
            { userIds: userIds },
            {
                headers: {
                    'Authorization': userToken
                }
            }
        )).data;

        const tenantGroupDetails = {
            ...tenantGroup,
            users: users
        }

        return tenantGroupDetails;
    }

    async updateById(tenantGroupId, tenantGroupData) {

        const currentTenantGroup = await this.findById(tenantGroupId);
        if (!currentTenantGroup) throw new Error('Tenant Group not found');

        const result = await this.collection.updateOne(
            { _id: ObjectId.createFromHexString(tenantGroupId)}, 
            {
                $set: {
                    title: tenantGroupData.title || currentTenantGroup.title,
                    users: tenantGroupData.users || currentTenantGroup.users,
                }
            }
        );

        return result.matchedCount > 0;
    }

    async deleteById(tenantGroupId) {
        const result = await this.collection.deleteOne({ _id: ObjectId.createFromHexString(tenantGroupId) });
        return result.deletedCount > 0;
    }

}

module.exports = TenantGroupRepository;