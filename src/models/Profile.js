/*const { MongoClient, ObjectId } = require("mongodb");

class ProfileModel {
    constructor(db) {
        this.collection = db.collection("Profiles"); // Nombre de la colección
    }

    async createProfile(data) {
        const newProfile = {
            user: ObjectId(data.user),
            name: data.name,
            avatar: data.avatar || 'default_avatar.png',
            bio: data.bio || '',
            createdAt: new Date()
        };

        const result = await this.collection.insertOne(newProfile);
        return result.ops[0];
    }

    async findProfileById(id) {
        return await this.collection.findOne({ _id: ObjectId(id) });
    }

    async findProfilesByUser(userId) {
        return await this.collection.find({ user: ObjectId(userId) }).toArray();
    }

    async updateProfile(id, data) {
        const updatedProfile = {
            ...data,
            updatedAt: new Date() // Agregar campo de actualización
        };

        const result = await this.collection.findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: updatedProfile },
            { returnOriginal: false }
        );

        return result.value; // Devuelve el perfil actualizado
    }

    async deleteProfile(id) {
        const result = await this.collection.deleteOne({ _id: ObjectId(id) });
        return result.deletedCount > 0; // Devuelve true si se eliminó
    }
}

module.exports = ProfileModel;


/*const { Schema, model } = require("mongoose");

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'default_avatar.png'
    },
    bio: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model("Profile", ProfileSchema);*/