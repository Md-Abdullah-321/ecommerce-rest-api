const app = require('./app');
const connectionDB = require('./config/db');
const { serverPort } = require('./secret');


//Running Server:
app.listen(serverPort, async() => {
    console.log(`Server is running at http://localhost:${serverPort}`);

    await connectionDB();
});


