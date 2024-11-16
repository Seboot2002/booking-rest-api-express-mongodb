class TenantGroupModel {

    constructor({ title, users }) {

        this.title = title;
        this.users = users || [];

    }
}

module.exports = TenantGroupModel;