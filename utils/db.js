// // Database connection utility
// const mongoose = require('mongoose');
// const config = require('../config');
// const logger = require('../utils/logger');

// /**
//  * Connects to MongoDB
//  * @returns {Promise} Mongoose connection promise
//  */
// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(config.dbUri, {
//             // Modern versions of mongoose don't need these options,
//             // but keeping for backward compatibility if needed
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });

//         logger.info(`MongoDB Connected: ${conn.connection.host}`);
//         return conn;
//     } catch (error) {
//         logger.error(`MongoDB connection error: ${error.message}`);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;
