const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config');
const { setupSwagger } = require('./swagger/swagger');

// Import routes
const noteRouter = require('./routes/noteRouter');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Logging
if (config.isDev) {
    app.use(logger('dev'));
} else {
    app.use(logger('combined'));
}

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files
// app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/notes', noteRouter);

// Setup Swagger
setupSwagger(app);

// Redirect root to API docs
app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

// Handle 404
app.use((req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

// Global error handler
app.use(errorHandler);

module.exports = app;
