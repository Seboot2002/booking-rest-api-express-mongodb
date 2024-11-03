class CapitalModel {

    constructor({ total_money, dep_resv_count, user, created_at = new Date() }) {

        this.total_money = total_money;
        this.dep_resv_count = dep_resv_count;
        this.created_at = created_at;
        this.user = user;
    }
}

module.exports = CapitalModel;