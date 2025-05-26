/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';

    // Development error response (more detailed)
    if (process.env.NODE_ENV === 'development') {
        return res.status(statusCode).json({
            status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }

    // Production error response (less detailed, more secure)
    if (err.isOperational) {
        // Known operational errors that we can predict
        return res.status(statusCode).json({
            status,
            message: err.message
        });
    }

    // Programming or unknown errors: don't leak error details
    console.error('ERROR 💥', err);
    return res.status(500).json({
        status: 'error',
        message: 'Something went wrong'
    });
};

module.exports = errorHandler;
