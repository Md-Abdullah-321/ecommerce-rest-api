require('dotenv').config();
const serverPort = process.env.SERVER_PORT || 3002;
const Database_URL = process.env.DATABASE_URL;
const defaultImagePath = process.env.DEFAULT_USER_IMAGE_PATH || 'public/images/users/default.jpeg';
const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || 'Process'
const jwtAccessKey = process.env.JWT_ACCESS_KEY || 'ecommerce_user'
const jwtRefreshKey = process.env.JWT_REFRESH_KEY || 'JWT_REFRESH_KEY'

const smtpUsername = process.env.SMTP_USERNAME || '';
const smtpPassword = process.env.SMTP_PASSWORD || '';

const clientURL = process.env.CLIENT_URL;


const jwtForgetPasswordKey = process.env.FORGET_PASSWORD_JWT_KEY || "I_FORGET_MY_PASSWORD";


module.exports = {
    serverPort,
    Database_URL,
    defaultImagePath,
    jwtActivationKey,
    smtpUsername,
    smtpPassword,
    clientURL,
    jwtAccessKey,
    jwtForgetPasswordKey,
    jwtRefreshKey
}