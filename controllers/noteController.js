const Note = require("../models/note");

exports.createNote = async (req, res) => {
    try {
        const noteData = {
            ...req.body,
            lastModified: Date.now()
        };
        const newNote = await Note.create(noteData);

        res.status(201).json({
            status: 'success',
            data: {
                note: newNote
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        if (!notes) {
            return res.status(404).json({
                status: 'fail',
                message: 'No notes found'
            });
        }

        res.status(200).json({
            status: 'success',
            results: notes.length,
            data: {
                notes
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.getNoteById = async (req, res) => {
    try {
        const note = await Note.findOne({ noteId: req.params.id });

        if (!note) {
            return res.status(404).json({
                status: 'fail',
                message: 'Note not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                note
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const note = await Note.findOne({ noteId: req.params.id });
        if (!note) {
            return res.status(404).json({
                status: 'fail',
                message: 'Note not found'
            });
        }

        const updatedNote = await Note.findOneAndUpdate({ noteId: req.params.id }, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                note: updatedNote
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findOne({ noteId: req.params.id });

        if (!note) {
            return res.status(404).json({
                status: 'fail',
                message: 'Note not found'
            });
        }

        await Note.deleteOne({ noteId: req.params.id });

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};