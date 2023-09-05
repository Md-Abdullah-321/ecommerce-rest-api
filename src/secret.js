require('dotenv').config();
const serverPort = process.env.SERVER_PORT || 3002;
const Database_URL = process.env.DATABASE_URL;
const defaultImagePath = process.env.DEFAULT_USER_IMAGE_PATH || 'public/images/users/default.jpeg';
const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || 'Process'

const smtpUsername = process.env.SMTP_USERNAME || '';
const smtpPassword = process.env.SMTP_PASSWORD || '';

const clientURL = process.env.CLIENT_URL;

const uploadDir = process.env.UPLOAD_FILE || 'public/image/users';

module.exports = {
    serverPort,
    Database_URL,
    defaultImagePath,
    jwtActivationKey,
    smtpUsername,
    smtpPassword,
    clientURL,
    uploadDir
}