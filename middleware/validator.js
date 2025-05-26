/**
 * Validates note input for create and update operations
 */

const validateNote = (req, res, next) => {
    const { content, noteId } = req.body;
    const errors = {};

    // Skip validation for update operations if fields are not present
    if (req.method === 'PATCH') {
        if (!content) {
            return next();
        }

        if (content) {
            if (typeof content !== 'string' || content.trim() === '') {
                errors.content = 'Content must be a non-empty string';
            }
        }


    } else {
        // For POST requests, validate required fields
        if (!content) {
            errors.content = 'Content is required';
        }

        if (!noteId) {
            errors.noteId = 'Note ID is required';
        }

    }

    // Return errors if any
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            status: 'fail',
            message: 'Validation error',
            errors
        });
    }

    next();
};


module.exports = {
    validateNote,
};


