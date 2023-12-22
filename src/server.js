const app = require('./app');
const connectionDB = require('./config/db');
const logger = require('./controllers/loggerController');
const { serverPort } = require('./secret');


//Running Server:
app.listen(serverPort, async() => {
    logger.log('info',`Server is running at http://localhost:${serverPort}`);

    await connectionDB();
});


