require('dotenv').config();
const app = require("./config/app");
const { connect, getDb } = require('./services/mongoService');

const notificationRoutes = require("./routes/notification.routes");

(async () => {
    try {
        await connect();
        const db = getDb();

        app.use('/api/notification', notificationRoutes(db));

        const port = process.env.PORT;
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
        
    } catch (error) {
        console.error(`Error starting the server: ${error.message}`);
        process.exit(1);
    }
})();