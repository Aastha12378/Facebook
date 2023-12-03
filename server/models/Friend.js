const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require : true
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require : true
        },
        // status: {
        //     type: String, 
        //     enum: ['pending', 'accepted'],
        //     default: 'pending'
        // },
    },
    { timestamps: true }
);

const Friendship = mongoose.model('Friendship', friendshipSchema);

module.exports = Friendship;
