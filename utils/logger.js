const winston = require('winston');

// Define log levels
const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
};

// Define log colors
const logColors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    verbose: 'cyan',
    debug: 'white',
    silly: 'gray'
};

// Add colors to Winston
winston.addColors(logColors);

// Create format
const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

// Create console transport
const consoleTransport = new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        format
    )
});

// Create file transport for error logs
const errorTransport = new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
    format
});

// Create file transport for combined logs
const combinedTransport = new winston.transports.File({
    filename: 'logs/combined.log',
    format
});

// Create logger instance
const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    levels: logLevels,
    transports: [
        consoleTransport,
        errorTransport,
        combinedTransport
    ],
    exitOnError: false
});

// Export logger and some convenience methods
module.exports = {
    logger,
    error: (message) => logger.error(message),
    warn: (message) => logger.warn(message),
    info: (message) => logger.info(message),
    http: (message) => logger.http(message),
    debug: (message) => logger.debug(message)
};
