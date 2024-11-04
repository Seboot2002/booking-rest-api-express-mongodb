class NotificationModel {

    constructor({ message, user, created_at = new Date() }) {

        this.message = message;
        this.created_at = created_at;
        this.user = user;
    }
}

module.exports = NotificationModel;