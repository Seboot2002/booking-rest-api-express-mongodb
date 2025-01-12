const { ObjectId } = require("mongodb");
const KafkaEventConsumer = require("../services/kafkaService/kafkaEventConsumer");
const { default: axios } = require("axios");

class NofiticationRepository {

    constructor(db) {
        this.collection = db.collection('Notification');
        this.eventConsumer = new KafkaEventConsumer("user-updates");
        this.initConsumer();
    }

    async initConsumer(){

        await this.eventConsumer.consume(this.processMessage.bind(this));
    }

    async processMessage(event) {
        try {

            console.log("Evento recibido:", event);
            
            let userEmailUpdated = event.updatedFields.email;
            let TimeUserUpdated = event.timestamp;

            const result = {
                titulo: `Se ha actualizado tu usuario a ${userEmailUpdated}`,
                descripcion: `Se ha hecho una actualizacion de tus datos`,
                tipo: 1,
                created_at: TimeUserUpdated,
                user: event.user_id
            }

            await this.create(result);
            console.log("Notificacion creada:", event);
            
        } catch (error) {
            console.error("Error al procesar el mensaje:", error);
        }
    }

    async create(notification) {

        const result = this.collection.insertOne({
            titulo: notification.titulo,
            descripcion: notification.descripcion,
            tipo: notification.tipo,
            created_at: notification.created_at,
            user: notification.user
        });

        return result;
    }

    async findById(notificationId) {

        const notification = await this.collection.findOne({ _id: ObjectId.createFromHexString(notificationId) }, 
        {
            projection: {
                _id: 0
            }
        });

        return notification;
    }

    async findByIdDetailed(notificationId, userToken) {

        const notification = await this.collection.findOne({ _id: ObjectId.createFromHexString(notificationId) }, 
        {
            projection: {
                _id: 0
            }
        });

        const user = (await axios.get(`http://user-microservice:3000/api/user`, {
            headers: {
                'Authorization': userToken
            }
        })).data;

        const notificationDetails = {
            ...notification,
            user: user
        }

        return notificationDetails;
    }

    async updateById(notificationId, notificationData) {

        const currentNotification = await this.findById(notificationId);
        if (!currentNotification) throw new Error('Notification not found');

        const result = await this.collection.updateOne(
            { _id: ObjectId.createFromHexString(notificationId)}, 
            {
                $set: {
                    titulo: notificationData.titulo || currentNotification.titulo,
                    created_at: notificationData.created_at || currentNotification.created_at,
                    user: notificationData.user || currentNotification.user
                }
            }
        );

        return result.matchedCount > 0;
    }

    async deleteById(notificationId) {
        const result = await this.collection.deleteOne({ _id: ObjectId.createFromHexString(notificationId) });
        return result.deletedCount > 0;
    }

}

module.exports = NofiticationRepository;