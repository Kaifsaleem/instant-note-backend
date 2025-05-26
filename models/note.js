const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    noteId: {
        type: String,
        required: [true, 'Please provide your note ID'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Please provide the content of the note'],
        trim: true

    },
}, {
    timestamps: true
});


const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
