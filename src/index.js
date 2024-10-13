require('dotenv').config();
const app = require("./config/app");
const { connect, getDb } = require('./services/mongoService');

const userRoutes = require("./routes/user.routes");
const groupRoutes = require("./routes/group.routes");

(async () => {
    try {
        await connect();
        const db = getDb();

        app.use('/api/user', userRoutes(db));
        app.use('/api/group', groupRoutes(db));

        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.error(`Error starting the server: ${error.message}`);
        process.exit(1);
    }
})();