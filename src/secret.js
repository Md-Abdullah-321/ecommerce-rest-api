require('dotenv').config();
const serverPort = process.env.SERVER_PORT || 3002;
const Database_URL = process.env.DATABASE_URL;
const defaultImagePath = process.env.DEFAULT_USER_IMAGE_PATH || 'public/images/users/default.jpeg';


module.exports = {
    serverPort,
    Database_URL,
    defaultImagePath
}