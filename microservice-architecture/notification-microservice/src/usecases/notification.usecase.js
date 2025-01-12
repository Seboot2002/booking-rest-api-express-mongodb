const Notificacion = require("../entities/Notification");

class NotificacionUseCase {

    constructor(notificacionRepository) {

        this.notificacionRepository = notificacionRepository;
    }

    async createNotification(notificationData, userId) {

        const notificationModel = new Notificacion({
            titulo: notificationData.titulo,
            descripcion: notification.descripcion,
            tipo: notification.tipo,
            user: userId
        });

        const finalModel = await this.notificacionRepository.create(notificationModel);

        return finalModel;
    }

    async getNotificationData(notificationId, userToken){

        const notification = await this.notificacionRepository.findByIdDetailed(notificationId, userToken);

        return notification;
    }

    async updateNotification(notificationId, notificationData){

        const check = await this.notificacionRepository.updateById(notificationId, notificationData);

        return check;
    }

    async deleteNotification(notificationId){

        const check = await this.notificacionRepository.deleteById(notificationId);

        return check;
    }
}
module.exports = NotificacionUseCase;