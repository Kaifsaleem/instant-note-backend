/**
 * Validates note format
 * @param {object} note - Note to validate
 * @returns {boolean} - True if note is valid, false otherwise
 */
exports.isValidNote = (note) => {
    if (!note || typeof note !== 'object') {
        return false;
    }
    if (!note.noteId || typeof note.noteId !== 'string' || note.noteId.trim() === '') {
        return false;
    }
    if (!note.content || typeof note.content !== 'string' || note.content.trim() === '') {
        return false;
    }
    return true;
};



