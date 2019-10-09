const mongoose = require('../database');

const TasksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    finish: {
        type: Boolean,
        default: false,
    },
    archive: { 
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

//definindo
const Tasks = mongoose.model('Tasks', TasksSchema)

module.exports = Tasks;