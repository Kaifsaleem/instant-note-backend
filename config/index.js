// Environment configuration
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
    // Server settings
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',

    // Database settings
    dbUri: process.env.DB_URI,

    // Authentication settings
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '90d',

    geminiApi: process.env.GEMINI_API,

    // App settings
    isDev: process.env.NODE_ENV !== 'production',
    apiPrefix: '/api'
};
