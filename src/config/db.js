const mongoose = require('mongoose');
const { Database_URL } = require('../secret');
const logger = require('../controllers/loggerController');
const connectionDB = async (options = {}) => {
    try {
        await mongoose.connect(Database_URL);
        logger.log('info','Database Connected');

        mongoose.connection.on('error', (error) => {
            logger.log('error','DB Connection Error');
        })
    } catch (error) {
        logger.log('error','Could not connect to DB', error.toString());
    }
}

module.exports = connectionDB;