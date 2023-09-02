const mongoose = require('mongoose');
const { Database_URL } = require('../secret');
const connectionDB = async (options = {}) => {
    try {
        await mongoose.connect(Database_URL);
        console.log('Database Connected');

        mongoose.connection.on('error', (error) => {
            console.error('DB Connection Error');
        })
    } catch (error) {
        console.error('Could not connect to DB', error.toString());
    }
}

module.exports = connectionDB;