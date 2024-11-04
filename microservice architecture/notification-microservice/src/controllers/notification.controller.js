const NotificacionUseCase = require("../usecases/notification.usecase");

class NotificacionController {

    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
        this.notificationUseCase = new NotificacionUseCase(this.notificationRepository);
    }

    async createNotification(req, res) {
        
        const userId = req.token_usuarioId;

        try {
            let notification = await this.notificationUseCase.createNotification(req.body, userId);

            res.status(201).json(notification);

        } catch (error) {

            res.status(400).json({ error: error.message });
        }
    }

    async getNotificationData(req, res) {
        
        const userToken = req.token_only;

        try {
            const notification = await this.notificationUseCase.getNotificationData(req.params.id, userToken);

            res.status(201).send(notification);

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateNotification(req, res) {

        try {
            const check = await this.notificationUseCase.updateNotification(req.params.id, req.body);

            if (check){
                res.status(201).send("Notification updated");
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteNotification(req, res) {

        try {
            const check = await this.notificationUseCase.deleteNotification(req.params.id);

            if (check){
                res.status(201).send("Notification deleted");
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = NotificacionController;