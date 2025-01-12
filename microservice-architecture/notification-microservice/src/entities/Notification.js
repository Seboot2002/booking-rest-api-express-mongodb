class NotificationModel {

    constructor({ titulo, descripcion, tipo, user, created_at = new Date() }) {

        this.titulo = titulo;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.created_at = created_at;
        this.user = user;
    }
}

module.exports = NotificationModel;