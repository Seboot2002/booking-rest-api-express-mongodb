/*const { Schema, model } = require("mongoose");

const GroupChatSchema = new Schema({
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true,
    },
    messages: [{
        user: { 
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        message: {
            type: String,
            required: true,
        },
        createdAt: { 
            type: Date,
            default: Date.now,
        },
    }],
});

module.exports = model("GroupChat", GroupChatSchema);*/